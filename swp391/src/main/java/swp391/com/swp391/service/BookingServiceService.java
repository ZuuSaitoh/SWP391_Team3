package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.BookingServiceCreationRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateFeedbackRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateStatusRequest;
import swp391.com.swp391.entity.BookingService;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.entity.Status;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.BookingServiceRepository;
import swp391.com.swp391.repository.CustomerRepository;
import swp391.com.swp391.repository.ServiceRepository;
import swp391.com.swp391.repository.StaffRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingServiceService {
    @Autowired
    BookingServiceRepository bookingServiceRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ServiceRepository serviceRepository;

    public BookingService createBookingService(BookingServiceCreationRequest request){
        BookingService bookingService = new BookingService();

        Staff staff = staffRepository.findById(String.valueOf(request.getStaffId()))
                .orElseThrow(()-> new AppException(ErrorCode.STAFF_NOT_EXISTED));
        bookingService.setStaff(staff);

        Customer customer = customerRepository.findById(String.valueOf(request.getCustomerId()))
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        bookingService.setCustomer(customer);

        swp391.com.swp391.entity.Service service = serviceRepository.findById(String.valueOf(request.getServiceId()))
                .orElseThrow(()-> new AppException(ErrorCode.SERVICE_NOT_EXISTED));
        bookingService.setService(service);
        bookingService.setBookingDate(LocalDateTime.now());
        bookingService.setPrice(request.getPrice());
        bookingService.setUsingPoint(request.getUsingPoint());

        return bookingServiceRepository.save(bookingService);
    }

    public List<BookingService> getAllBookingService() {
        return bookingServiceRepository.findAll();
    }

    public BookingService getBookingServiceById(int id){
        return bookingServiceRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.BOOKING_SERVICE_NOT_EXISTED));
    }

    public void deleteBookingServiceById(int id){
        bookingServiceRepository.deleteById(id);
    }

    public BookingService updateBookingServiceStatus(int id, BookingServiceUpdateStatusRequest request){
        BookingService bookingService = bookingServiceRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.BOOKING_SERVICE_NOT_EXISTED));
        if(bookingService.isStatus()){
            throw new AppException(ErrorCode.COMPLETE_TRUE);
        }
        bookingService.setStatus(request.isStatus());
        bookingService.setFinishDate(LocalDateTime.now());
        return bookingServiceRepository.save(bookingService);
    }

    public BookingService updateBookingServiceFeedback(int id, BookingServiceUpdateFeedbackRequest request){
        BookingService bookingService = bookingServiceRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.BOOKING_SERVICE_NOT_EXISTED));
        bookingService.setFeedback(request.getFeedback());
        bookingService.setFeedbackDate(LocalDateTime.now());
        return bookingServiceRepository.save(bookingService);
    }
}
