package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import swp391.com.swp391.dto.request.ContractCreationRequest;
import swp391.com.swp391.dto.request.ContractUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Contract;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.service.ContractService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contracts")
public class ContractController {
    @Autowired
    ContractService contractService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Contract> createContract(@RequestBody @Valid ContractCreationRequest request){
        ApiResponse<Contract> apiResponse = new ApiResponse<>();
        apiResponse.setResult(contractService.createContract(request));
        return apiResponse;
    }

//    @PostMapping(value = "/create", consumes = "multipart/form-data")
//    ApiResponse<Contract> createContract(@ModelAttribute ContractCreationRequest request,
//                                         @RequestParam("imageData") MultipartFile imageData){
//        ApiResponse<Contract> apiResponse = new ApiResponse<>();
//        try {
//            byte[] imageBytes= request.getImageData().getBytes();
//            apiResponse.setResult(contractService.createContract(imageData, request));
//            return apiResponse;
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Contract>> getAllContract(){
        return new ApiResponse<List<Contract>>(9999, "List of contract", contractService.getAllContract());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/test-upload")
    public ResponseEntity<String> testUpload(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok("File received: " + file.getOriginalFilename());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    public Contract getContractById(@PathVariable int id){
        return contractService.getContractById(id);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> deleteContractById(@PathVariable int id){
        contractService.deleteContractById(id);
        return new ApiResponse<String>(9876, "Delete contract", "Delete successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{id}")
    ApiResponse<Contract> updateContractByContractId(@PathVariable int id,
                                                  @RequestBody ContractUpdateRequest request){
        return new ApiResponse<Contract>
                (1234,"Update contract", contractService.updateContractByContractId(id, request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/order/{id}")
    ApiResponse<Optional<List<Contract>>> getAllContractByOrderId(@PathVariable int id){
        return new ApiResponse<Optional<List<Contract>>>(9999, "List of contract", contractService.getAllContractByOrderId(id));
    }

}
