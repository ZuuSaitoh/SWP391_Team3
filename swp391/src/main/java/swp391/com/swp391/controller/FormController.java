package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.FormCreationRequest;
import swp391.com.swp391.dto.request.FormUpdateRequest;
import swp391.com.swp391.dto.request.UpdateRejectReasonRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Form;
import swp391.com.swp391.service.FormService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/forms")
public class FormController {
    @Autowired
    FormService formService;
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Form> createForm(@RequestBody @Valid FormCreationRequest request){
        ApiResponse<Form> apiResponse = new ApiResponse<>();
        apiResponse.setResult(formService.createForm(request));
        return apiResponse;
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Form>> getAllForm(){
        return new ApiResponse<List<Form>>(9999,"List of form", formService.getAllForm());
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    ApiResponse<Form> getFormById(@PathVariable int id){
        return new ApiResponse<Form>(1111, "Form: "+ id, formService.findById(id));
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/customer/{id}")
    ApiResponse<Optional<List<Form>>> getFormByCustomerId(@PathVariable int id){
        return new ApiResponse<Optional<List<Form>>>(1111, "Form", formService.findByCustomerId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{id}")
    ApiResponse<Form> updateForm(@PathVariable int id, @RequestBody @Valid FormUpdateRequest request){
        return new ApiResponse<Form>(2222, "Update form", formService.updateForm(id, request));
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> deleteForm(@PathVariable int id){
        formService.deleteForm(id);
        return new ApiResponse<String>(3333, "Delete form", "Delete form successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/reject/{id}")
    ApiResponse<Form> updateRejectReason(@PathVariable int id, @RequestBody @Valid UpdateRejectReasonRequest request){
        return new ApiResponse<Form>(2222, "Update form", formService.updateRejectReason(id, request));
    }
}
