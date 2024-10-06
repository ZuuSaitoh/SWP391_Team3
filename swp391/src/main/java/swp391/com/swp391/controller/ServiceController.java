package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.ServiceCreationRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Service;
import swp391.com.swp391.service.ServiceService;

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
}
