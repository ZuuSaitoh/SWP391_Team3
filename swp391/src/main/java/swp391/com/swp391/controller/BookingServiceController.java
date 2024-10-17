package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.BookingServiceCreationRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateFeedbackRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateStatusRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.BookingService;
import swp391.com.swp391.service.BookingServiceService;

import java.util.List;

@RestController
@RequestMapping("/bookingservices")
public class BookingServiceController {
    @Autowired
    BookingServiceService bookingServiceService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<BookingService> createBookingService (@RequestBody @Valid BookingServiceCreationRequest request){
        ApiResponse<BookingService> apiResponse = new ApiResponse<>();
        apiResponse.setResult(bookingServiceService.createBookingService(request));
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<BookingService>> getAllBookingService(){
        return new ApiResponse<List<BookingService>>(9999, "List of all booking service", bookingServiceService.getAllBookingService());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    public BookingService getBookingServiceById(@PathVariable int id){
        return bookingServiceService.getBookingServiceById(id);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> deleteBookingServiceById(@PathVariable int id){
        bookingServiceService.deleteBookingServiceById(id);
        return new ApiResponse<String>(9876, "Delete booking service", "Delete Successfully!");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/updateStatus/{id}")
    public ApiResponse<BookingService> updateBookingServiceStatus(@PathVariable int id, @RequestBody @Valid BookingServiceUpdateStatusRequest request) {
        ApiResponse<BookingService> apiResponse = new ApiResponse<>();
        BookingService updatedBookingService = bookingServiceService.updateBookingServiceStatus(id, request);
        apiResponse.setResult(updatedBookingService);
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/updateFeedback/{id}")
    public ApiResponse<BookingService> updateBookingServiceFeedback(@PathVariable int id, @RequestBody @Valid BookingServiceUpdateFeedbackRequest request) {
        ApiResponse<BookingService> apiResponse = new ApiResponse<>();
        BookingService updatedBookingService = bookingServiceService.updateBookingServiceFeedback(id, request);
        apiResponse.setResult(updatedBookingService);
        return apiResponse;
    }
}
