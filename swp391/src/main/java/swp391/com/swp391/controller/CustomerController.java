package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.CustomerCreationRequest;
import swp391.com.swp391.dto.request.CustomerUpdatePasswordRequest;
import swp391.com.swp391.dto.request.CustomerUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.dto.response.CustomerResponse;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Customer> createCustomer(@RequestBody @Valid CustomerCreationRequest request){
        ApiResponse<Customer> apiResponse = new ApiResponse<>();
        apiResponse.setResult(customerService.create(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Customer>> getCustomer(){
        return new ApiResponse<List<Customer>>(9999,"List of User", customerService.getCustomer());
    }
//    List<Customer> getCustomer(){
//        return customerService.getCustomer();
//    }
//    ApiResponse<List<CustomerResponse>> getCustomer(){
//        return new ApiResponse<List<CustomerResponse>>(customerService.getCustomer());
//    }


    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    Customer getCustomer(@PathVariable int id){
        return customerService.getCustomerById(id);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{customer_id}")
    Customer updateCustomer(@PathVariable int customer_id, @RequestBody @Valid CustomerUpdateRequest request){
        return customerService.updateCustomer(customer_id, request);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{customer_id}")
    ApiResponse<String> deleteUserById(@PathVariable int customer_id){
        customerService.delete(customer_id);
        return new ApiResponse<String>(1012, "User deleted", "User deleted");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/password/{mail}")
    ApiResponse<String> updatePasswordByMail(@PathVariable String mail, @RequestBody @Valid CustomerUpdatePasswordRequest request){
        customerService.updatePassword(mail, request);
        return new ApiResponse<String>(2222, "Update password", "Update successfully!");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/checkMail/{mail}")
    ApiResponse<Boolean> checkExistedMail(@PathVariable String mail){
        return  new ApiResponse<Boolean>(4444, "Status of emails!", customerService.checkExistedMail(mail));
    }
}
