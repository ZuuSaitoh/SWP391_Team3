package swp391.com.swp391.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.StatusCreationRequest;
import swp391.com.swp391.dto.request.TransactionCreationRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Status;
import swp391.com.swp391.entity.Transaction;
import swp391.com.swp391.service.TransactionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Transaction> createTransaction(@RequestBody TransactionCreationRequest request){
        ApiResponse<Transaction> apiResponse = new ApiResponse<>();
        apiResponse.setResult(transactionService.createTransaction(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Transaction>> getAllTransaction(){
        return new ApiResponse<List<Transaction>>
                (9999, "List of transaction", transactionService.getAllTransaction());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    ApiResponse<Transaction> getTransactionByTransactionId(@PathVariable int id){
        return new ApiResponse<Transaction>
                (9999, "Transaction", transactionService.getTransactionByTransactionId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/order/{id}")
    ApiResponse<Optional<List<Transaction>>> getAllTransactionByOrderId(@PathVariable int id){
        return new ApiResponse<Optional<List<Transaction>>>
                (9999, "List of transaction", transactionService.getAllTransactionByOrderId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> deleteTransaction(@PathVariable int id){
        transactionService.deleteTransaction(id);
        return new ApiResponse<String>(1012,"Transaction deleted","Transaction deleted!");
    }
}
