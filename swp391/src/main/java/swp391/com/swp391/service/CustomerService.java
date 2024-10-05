package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.access.prepost.PostAuthorize;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.CustomerCreationRequest;
import swp391.com.swp391.dto.request.CustomerUpdatePasswordRequest;
import swp391.com.swp391.dto.request.CustomerUpdateRequest;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.mapper.CustomerMapper;
import swp391.com.swp391.repository.CustomerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
//@EnableWebSecurity
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
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
//    public List<CustomerResponse> getCustomer(){
//        return customerRepository.findAll().stream().map(customerMapper::toCustomerResponse).toList();
//}

//    @PostAuthorize("returnObject.username == authentication.name")
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

    public int getCustomerIdByUsername(String username){
        return  customerRepository.findByUsername(username).map(Customer::getId).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer getCustomerByMail(String mail){
        return customerRepository.findByMail(mail).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }


    public Customer updatePassword(String mail, CustomerUpdatePasswordRequest request){
        Customer customer = getCustomerByMail(mail);
        if (customer.getPassword().isEmpty()){
            throw new AppException(ErrorCode.LOGIN_GG_NOT_PASSWORD);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        return customerRepository.save(customer);
    }
}
