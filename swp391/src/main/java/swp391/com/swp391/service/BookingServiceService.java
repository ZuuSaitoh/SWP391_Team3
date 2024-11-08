package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.BookingServiceAddStaffCreationRequest;
import swp391.com.swp391.dto.request.BookingServiceCreationRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateFeedbackRequest;
import swp391.com.swp391.dto.request.BookingServiceUpdateStatusRequest;
import swp391.com.swp391.entity.*;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    @Autowired
    ServiceTransactionRepository serviceTransactionRepository;
    @Autowired
    ServiceTransactionService serviceTransactionService;
    @Autowired
    PointHistoryService pointHistoryService;

    public BookingService createBookingService(BookingServiceCreationRequest request){
        BookingService bookingService = new BookingService();

//       Staff staff = staffRepository.findById(String.valueOf(request.getStaffId()))
//                .orElseThrow(()-> new AppException(ErrorCode.STAFF_NOT_EXISTED));
//       bookingService.setStaff(staff);

        Customer customer = customerRepository.findById(String.valueOf(request.getCustomerId()))
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        bookingService.setCustomer(customer);

        swp391.com.swp391.entity.Service service = serviceRepository.findById(String.valueOf(request.getServiceId()))
                .orElseThrow(()-> new AppException(ErrorCode.SERVICE_NOT_EXISTED));
        bookingService.setService(service);
        bookingService.setBookingDate(LocalDateTime.now());
        bookingService.setPrice(request.getPrice());
        //tru diem neu khach hang su dung diem
        if (customer.getPoint() < request.getUsingPoint()){
            throw new AppException(ErrorCode.MAX_POINT);
        }
        bookingService.setUsingPoint(request.getUsingPoint());
        bookingService = bookingServiceRepository.save(bookingService);

        pointHistoryService.usingPointBookingService(customer, bookingService, request.getUsingPoint());

        customer.setPoint(customer.getPoint() - request.getUsingPoint());
        customerRepository.save(customer);
        return bookingService;
    }

    //Hàm dùng để cho Manager chọn ConstructionStaff làm 1 Order nào đó
    public BookingService createStaffToDoAnOrder(int bookingServiceId, BookingServiceAddStaffCreationRequest request){
        BookingService bookingService = getBookingServiceById(bookingServiceId);
        Staff staff = staffRepository.findById(String.valueOf(request.getStaffId()))
                .orElseThrow(()-> new AppException(ErrorCode.STAFF_NOT_EXISTED));
        bookingService.setStaff(staff);
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
        if (serviceTransactionRepository.existsByBookingService_bookingServiceId(id)) {
            if (bookingService.getPrice()>0) {
                Customer customer = bookingService.getCustomer();
                int point = (int) Math.floor(bookingService.getPrice()/100000);

                pointHistoryService.addPointBookingService(customer, bookingService, point);

                customer.setPoint(customer.getPoint() + point);
                customerRepository.save(customer);
            }
        }
        return bookingServiceRepository.save(bookingService);
    }

    public BookingService updateBookingServiceRatingAndFeedback(int id, BookingServiceUpdateFeedbackRequest request){
        BookingService bookingService = bookingServiceRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.BOOKING_SERVICE_NOT_EXISTED));
        bookingService.setFeedback(request.getFeedback());
        bookingService.setRating(request.getRating());
        bookingService.setFeedbackDate(LocalDateTime.now());
        return bookingServiceRepository.save(bookingService);
    }

    public Optional<List<BookingService>> getAllBookingServiceByStaffId(int staffId){
        return bookingServiceRepository.findByStaff_staffId(staffId);
    }

    public Optional<List<BookingService>> getAllBookingServiceByCustomerId(int customerId){
        return bookingServiceRepository.findByCustomer_Id(customerId);
    }

    public Optional<List<BookingService>> getAllBookingServiceByServiceId(int serviceId){
        return bookingServiceRepository.findByService_serviceId(serviceId);
    }
}
