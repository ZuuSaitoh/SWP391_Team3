package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import swp391.com.swp391.dto.request.AcceptanceTestCreationRequest;
import swp391.com.swp391.dto.request.AcceptanceTestUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.AcceptanceTest;
import swp391.com.swp391.service.AcceptanceTestService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/acceptancetests")
public class AcceptanceTestController {
    @Autowired
    AcceptanceTestService acceptanceTestService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<AcceptanceTest> createAcceptanceTest(@RequestBody @Valid AcceptanceTestCreationRequest request){
        ApiResponse<AcceptanceTest> apiResponse = new ApiResponse<>();
        apiResponse.setResult(acceptanceTestService.createAcceptanceTest(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<AcceptanceTest>> getAllAcceptanceTest(){
        return new ApiResponse<List<AcceptanceTest>>(9999, "List of acceptance test", acceptanceTestService.getAllAcceptanceTest());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/test-upload")
    public ResponseEntity<String> testUpload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("File received: " + file.getOriginalFilename());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    public AcceptanceTest getAcceptanceTestById(@PathVariable int id) {
        return acceptanceTestService.getAcceptanceTestById(id);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> deleteAcceptanceTestById(@PathVariable int id){
        acceptanceTestService.deleteAcceptanceTestById(id);
        return new ApiResponse<String>(9876, "Delete acceptance test", "Delete successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{id}")
    ApiResponse<AcceptanceTest> updateAcceptanceTestById(@PathVariable int id, @RequestBody AcceptanceTestUpdateRequest request){
        return new ApiResponse<AcceptanceTest>(1234, "Update acceptance test", acceptanceTestService.updateAcceptanceTestById(id, request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/order/{id}")
    ApiResponse<Optional<List<AcceptanceTest>>> getAllAcceptanceTestByOrderId(@PathVariable int id){
        return new ApiResponse<Optional<List<AcceptanceTest>>>(9999, "List of acceptance test", acceptanceTestService.getAllAcceptanceTestByOrderId(id));
    }
}

