package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.CustomerCreationRequest;
import swp391.com.swp391.dto.request.CustomerUpdateRequest;
import swp391.com.swp391.dto.response.CustomerResponse;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.mapper.CustomerMapper;
import swp391.com.swp391.repository.CustomerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    CustomerMapper customerMapper;

    public Customer create(CustomerCreationRequest request){
        if (customerRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);
        if (customerRepository.existsByMail(request.getMail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (!request.getPassword().matches(request.getConfirm_password()))
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
//        Customer customer = customerMapper.toCustomer(request);
        Customer customer = new Customer();
        customer.setUsername(request.getUsername());
        customer.setPassword(request.getPassword());
        customer.setMail(request.getMail());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        return customerRepository.save(customer);
    }

    public List<Customer> getCustomer(){
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int customer_id){
        return customerRepository.findById(String.valueOf(customer_id))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }
    public Customer updateCustomer(int customer_id, CustomerUpdateRequest request){
        Customer customer = getCustomerById(customer_id);
        customer.setAddress(request.getAddress());
        customer.setPhone(request.getPhone());
        customer.setFullName(request.getFullName());
        return customerRepository.save(customer);
    }
    public void delete(int customer_id){
        customerRepository.deleteById(String.valueOf(customer_id));
    }
}
