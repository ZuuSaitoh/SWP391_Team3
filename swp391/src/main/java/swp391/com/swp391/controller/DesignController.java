package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import swp391.com.swp391.dto.request.DesignCreationRequest;
import swp391.com.swp391.dto.request.DesignUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Design;
import swp391.com.swp391.service.DesignService;

import java.util.List;

@RestController
@RequestMapping("/designs")
public class DesignController {
    @Autowired
    DesignService designService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Design> createDesign(@RequestBody @Valid DesignCreationRequest request){
        ApiResponse<Design> apiResponse = new ApiResponse<>();
        apiResponse.setResult(designService.createDesign(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Design>> getAllDesign(){
        return new ApiResponse<List<Design>>(9999,"List of all designs", designService.getAllDesign());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/test-upload")
    public ResponseEntity<String> testUpload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("File received: " + file.getOriginalFilename());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    public Design getDesignById(@PathVariable int id) { return designService.getDesignById(id); }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> deleteDesignById(@PathVariable int id){
        designService.deleteDesignById(id);
        return new ApiResponse<String>(9876, "Delete contract", "Delete successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{id}")
    ApiResponse<Design> updateDesignByDesignId(@PathVariable int id, @RequestBody DesignUpdateRequest request){
        return new ApiResponse<Design>(1234, "Update Design", designService.updateDesignByDesignId(id, request));
    }


}
