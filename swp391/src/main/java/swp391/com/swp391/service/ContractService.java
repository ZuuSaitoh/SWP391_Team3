package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import swp391.com.swp391.dto.request.ContractCreationRequest;
import swp391.com.swp391.dto.request.ContractUpdateRequest;
import swp391.com.swp391.entity.Contract;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.ContractRepository;
import swp391.com.swp391.repository.OrderRepository;
import swp391.com.swp391.repository.StaffRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {
    @Autowired
    ContractRepository contractRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    OrderRepository orderRepository;
    public Contract createContract(ContractCreationRequest request) {
        Contract contract = new Contract();
        Staff staff = staffRepository.findById(String.valueOf(request.getUploadStaff()))
                .orElseThrow(() -> new  AppException(ErrorCode.STAFF_NOT_EXISTED));
        contract.setStaff(staff);

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        contract.setOrder(order);

        contract.setImageData(request.getImageData());

        contract.setUploadDate(LocalDateTime.now());

        contract.setDescription(request.getDescription());

        return  contractRepository.save(contract);
    }

    public List<Contract> getAllContract(){
        return contractRepository.findAll();
    }

    public Contract getContractById(int id){
        return contractRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.CONTRACT_NOT_EXISTED));
    }

    public void deleteContractById(int id){
        contractRepository.deleteById(id);
    }

    public Contract updateContractByContractId(int id, ContractUpdateRequest request){
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_EXISTED));
        contract.setImageData(request.getImageData());
        contract.setDescription(request.getDescription());
        return contractRepository.save(contract);
    }

    public Optional<List<Contract>> getAllContractByOrderId(int orderId){
        return contractRepository.findByOrder_orderId(orderId);
    }
}
