package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.FormCreationRequest;
import swp391.com.swp391.dto.request.FormUpdateRequest;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.entity.Form;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.FormRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FormService {
    @Autowired
    FormRepository formRepository;
    @Autowired
    CustomerService customerService;

    public Form createForm(FormCreationRequest request){
        Form form = new Form();
        Customer customer = customerService.getCustomerById(request.getCustomerId());
        form.setCustomer(customer);
        form.setArea(request.getArea());
        form.setContactMethod(request.getContactMethod());
        form.setStyle(request.getStyle());
        form.setStage(request.getStage());
        return formRepository.save(form);
    }
    public List<Form> getAllForm(){
        return formRepository.findAll();
    }
    public Form findById(int id){
        return formRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.FORM_NOT_EXISTED));
    }
    public Optional<Form> findByCustomerId(int id){
        return Optional.ofNullable(formRepository.findByCustomer_id(id).orElseThrow(() -> new AppException(ErrorCode.FORM_NOT_EXISTED)));
    }
    public Form updateForm(int id, FormUpdateRequest request){
        Form form = findById(id);
        form.setArea(request.getArea());
        form.setStage(request.getStage());
        form.setContactMethod(request.getContactMethod());
        form.setStyle(request.getStyle());
        return formRepository.save(form);
    }
    public void deleteForm(int id){
        if (!formRepository.existsById(id)){
            throw new AppException(ErrorCode.FORM_NOT_EXISTED);
        }
        formRepository.deleteById(id);
    }
}
