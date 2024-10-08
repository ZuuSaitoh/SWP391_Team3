package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.OrderCreationRequest;
import swp391.com.swp391.dto.request.OrderUpdateFeedbackRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Order> createOrder(@RequestBody @Valid OrderCreationRequest request){
        ApiResponse<Order> apiResponse = new ApiResponse<>();
        apiResponse.setResult(orderService.createOrder(request));
        return apiResponse;
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Order>> getAllOrder(){
        return new ApiResponse<List<Order>>(9999, "List of order", orderService.getAllOrder());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{order_id}")
    Order getOrderById(@PathVariable int order_id){
        return orderService.getOrderById(order_id);
    }



    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update-end-date/{id}")
    ApiResponse<Order> updateEndDate(@PathVariable int id){
        return new ApiResponse<Order>(9998,"Update end date", orderService.updateEndDate(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update-rating-and-feedback/{id}")
    ApiResponse<Order> updateRatingAndFeedback(@PathVariable int id, @RequestBody @Valid OrderUpdateFeedbackRequest request){
        return new ApiResponse<Order>
                (9997, "Update rating and feedback",orderService.updateRatingAndFeedback(id, request));
    }
}
