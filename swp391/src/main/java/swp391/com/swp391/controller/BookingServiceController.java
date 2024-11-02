package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.BookingServiceAddStaffCreationRequest;
import swp391.com.swp391.dto.request.BookingServiceCreationRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateFeedbackRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateStatusRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.BookingService;
import swp391.com.swp391.service.BookingServiceService;

import java.util.List;
import java.util.Optional;

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
    @PutMapping("/update/staff/{id}")
    ApiResponse<BookingService> createStaffToDoAnOrder (@PathVariable int id,@RequestBody @Valid BookingServiceAddStaffCreationRequest request){
        ApiResponse<BookingService> apiResponse = new ApiResponse<>();
        apiResponse.setResult(bookingServiceService.createStaffToDoAnOrder(id, request));
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
        BookingService updatedBookingService = bookingServiceService.updateBookingServiceRatingAndFeedback(id, request);
        apiResponse.setResult(updatedBookingService);
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/staff/{id}")
    ApiResponse<Optional<List<BookingService>>> getAllBookingServiceByStaffId(@PathVariable int id){
        return new ApiResponse<Optional<List<BookingService>>>(9999, "List of Booking Service by Staff id", bookingServiceService.getAllBookingServiceByStaffId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/customer/{id}")
    ApiResponse<Optional<List<BookingService>>> getAllBookingServiceByCustomerId(@PathVariable int id){
        return new ApiResponse<Optional<List<BookingService>>>(9999, "List of Booking Service by Customer id", bookingServiceService.getAllBookingServiceByCustomerId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/service/{id}")
    ApiResponse<Optional<List<BookingService>>> getAllBookingServiceByServiceId(@PathVariable int id){
        return new ApiResponse<Optional<List<BookingService>>>(9999, "List of Booking Service by Service id", bookingServiceService.getAllBookingServiceByServiceId(id));
    }
}