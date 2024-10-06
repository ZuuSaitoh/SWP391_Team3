package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.ServiceCreationRequest;
import swp391.com.swp391.dto.request.ServiceUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Service;
import swp391.com.swp391.service.ServiceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/services")
public class ServiceController {
    @Autowired
    ServiceService serviceService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Service> create(@RequestBody @Valid ServiceCreationRequest request){
        ApiResponse<Service> apiResponse = new ApiResponse<>();
        apiResponse.setResult(serviceService.createService(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Service>> getCustomer(){
        return new ApiResponse<List<Service>>(9999,"List of Service", serviceService.getService());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{service_id}")
    Service getServiceById(@PathVariable int service_id){
        return serviceService.getServiceById(service_id);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{service_id}")
    ApiResponse<Service> updateService(@PathVariable int service_id, @RequestBody ServiceUpdateRequest request){
        return new ApiResponse<Service>
                (8888,"Update successfully", serviceService.updateService(service_id, request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{service_id}")
    ApiResponse<String> deleteUserById(@PathVariable int service_id){
        serviceService.delete(service_id);
        return new ApiResponse<String>(1012, "Service deleted", "Service deleted");
    }










//    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//    @GetMapping("/type/{service_type}")
//    Optional<List<Service>> getServicesByService_type(String service_type){
//        return serviceService.getServiceByService_type(service_type);
//    }
}
