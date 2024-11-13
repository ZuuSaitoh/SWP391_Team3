package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.entity.BookingService;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.entity.PointHistory;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.PointHistoryRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PointHistoryService {
    @Autowired
    PointHistoryRepository pointHistoryRepository;

    public PointHistory addPointOrder(Customer customer, Order order, int changePoint){
        PointHistory pointHistory = new PointHistory();
        pointHistory.setCustomer(customer);
        pointHistory.setOrder(order);
        pointHistory.setChangeType("Get point");
        pointHistory.setChangePoint(changePoint);
        pointHistory.setAfterUpdatePoint(customer.getPoint()+changePoint);
        pointHistory.setPointHistoryDate(LocalDateTime.now());
        return pointHistoryRepository.save(pointHistory);
    }

    public PointHistory addPointBookingService(Customer customer, BookingService bookingService, int changePoint){
        PointHistory pointHistory = new PointHistory();
        pointHistory.setCustomer(customer);
        pointHistory.setBookingService(bookingService);
        pointHistory.setChangeType("Get point");
        pointHistory.setChangePoint(changePoint);
        pointHistory.setAfterUpdatePoint(customer.getPoint() + changePoint);
        pointHistory.setPointHistoryDate(LocalDateTime.now());
        return pointHistoryRepository.save(pointHistory);
    }

    public PointHistory usingPointBookingService(Customer customer, BookingService bookingService, int changePoint){
        PointHistory pointHistory = new PointHistory();
        pointHistory.setCustomer(customer);
        pointHistory.setBookingService(bookingService);
        pointHistory.setChangeType("Using point");
        pointHistory.setChangePoint(changePoint);
        pointHistory.setAfterUpdatePoint(customer.getPoint() - changePoint);
        pointHistory.setPointHistoryDate(LocalDateTime.now());
        return pointHistoryRepository.save(pointHistory);
    }

    public List<PointHistory> fetchAll(){
        return pointHistoryRepository.findAll();
    }
    public Optional<List<PointHistory>> fetchAllByCustomerId(int id){
        if (!pointHistoryRepository.existsByCustomer_id(id))
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        return Optional.ofNullable(pointHistoryRepository.findByCustomer_id(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_HISTORY_NOT_EXISTED)));
    }

    public PointHistory getById(int id){
        return pointHistoryRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.HISTORY_NOT_EXISTED));
    }
}
