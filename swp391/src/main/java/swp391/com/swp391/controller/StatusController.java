package swp391.com.swp391.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.StatusCreationRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Contract;
import swp391.com.swp391.entity.Status;
import swp391.com.swp391.service.StatusService;

import java.util.List;

@RestController
@RequestMapping("/status")
public class StatusController {
    @Autowired
    StatusService statusService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Status> createStatus(@RequestBody StatusCreationRequest request){
        ApiResponse<Status> apiResponse = new ApiResponse<>();
        apiResponse.setResult(statusService.createStatus(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Status>> getAllContract(){
        return new ApiResponse<List<Status>>(9999, "List of order", statusService.getAllStatus());
    }
}
