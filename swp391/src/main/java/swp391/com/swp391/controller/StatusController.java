package swp391.com.swp391.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.StatusCreationRequest;
import swp391.com.swp391.dto.request.StatusUpdateCompleteRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Contract;
import swp391.com.swp391.entity.Status;
import swp391.com.swp391.service.StatusService;

import java.util.List;
import java.util.Optional;

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
    ApiResponse<List<Status>> getAllStatus(){
        return new ApiResponse<List<Status>>(9999, "List of status", statusService.getAllStatus());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    ApiResponse<Status> getStatusByStatusId(@PathVariable int id){
        return new ApiResponse<Status>(9999, "status", statusService.getStatusByStatusId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/order/{id}")
    ApiResponse<Optional<List<Status>>> getAllContractByOrderId(@PathVariable int id){
        return new ApiResponse<Optional<List<Status>>>
                (9999, "List of status", statusService.getAllStatusByOrderId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/staff/{id}")
    ApiResponse<Optional<List<Status>>> getAllContractByStaffId(@PathVariable int id){
        return new ApiResponse<Optional<List<Status>>>
                (9999, "List of status", statusService.getAllStatusByStaffId(id));
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update-complete/{id}")
    ApiResponse<Status> updateCompleteByStatusId(@PathVariable int id, @RequestBody StatusUpdateCompleteRequest request){
        return new ApiResponse<Status>
                (999, "update complete of status", statusService.updateCompleteStatus(id, request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PatchMapping("/update-number-of-update/{id}")
    ApiResponse<Status> updateCompleteByStatusId(@PathVariable int id){
        return new ApiResponse<Status>
                (999, "update complete of status", statusService.statusUpdateNumberOfUpdate(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> deleteStatus(@PathVariable int id){
        statusService.deleteStatus(id);
        return new ApiResponse<String>(1012,"Status deleted","Status deleted!");
    }

}
