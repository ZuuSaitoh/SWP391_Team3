package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.ServiceTransactionCreationRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.ServiceTransaction;
import swp391.com.swp391.repository.ServiceTransactionRepository;
import swp391.com.swp391.service.ServiceTransactionService;

import java.util.List;

@RestController
@RequestMapping("/serviceTransaction")
public class ServiceTransactionController {
    @Autowired
    ServiceTransactionService serviceTransactionService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create/cash")
    ApiResponse<ServiceTransaction>
    createServiceTransactionByCash(@RequestBody @Valid ServiceTransactionCreationRequest request){
        return new ApiResponse<ServiceTransaction>
                (2222, "Transaction successfully",
                        serviceTransactionService.createTransactionByCash(request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<ServiceTransaction>> getAllTransaction(){
        return new ApiResponse<List<ServiceTransaction>>
                (9999, "List of transaction", serviceTransactionService.getAllTransaction());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    ApiResponse<ServiceTransaction> getTransactionById(@PathVariable int id){
        return new ApiResponse<ServiceTransaction>
                (9999, "Transaction " + id , serviceTransactionService.getTransactionById(id));
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> deleteTransaction(@PathVariable int id){
        serviceTransactionService.deleteTransaction(id);
        return new ApiResponse<String>(1234, "Delete transaction", "Delete successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/all")
    ApiResponse<String> deleteAllTransaction(){
        serviceTransactionService.deleteAllTransaction();
        return new ApiResponse<String>(1234, "Delete transaction", "Delete successfully");
    }
}
