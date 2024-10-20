package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.DiscountCreationRequest;
import swp391.com.swp391.dto.request.DiscountUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Discount;
import swp391.com.swp391.service.DiscountService;

import java.util.List;

@RestController
@RequestMapping("/discounts")
public class DiscountController {
    @Autowired
    DiscountService discountService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Discount> createDiscount(@RequestBody @Valid DiscountCreationRequest request){
        ApiResponse<Discount> apiResponse = new ApiResponse<>();
        apiResponse.setResult(discountService.createDiscount(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Discount>> getAllDiscount(){
        return new ApiResponse<List<Discount>>(9999, "List of discount", discountService.getAllDiscount());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    public Discount getDiscountById(@PathVariable int id) {
        return discountService.getDiscountById(id);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> deleteDiscountById(@PathVariable int id){
        discountService.deleteDiscountById(id);
        return new ApiResponse<String>(9876, "Delete discount", "Delete successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{id}")
    ApiResponse<Discount> updateDiscountByDiscountId(@PathVariable int id, @RequestBody DiscountUpdateRequest request){
        return new ApiResponse<Discount>(1234, "Update discount", discountService.updateDiscountByDiscountId(id, request));
    }
}
