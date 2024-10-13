package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.StatusCreationRequest;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.entity.Status;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.OrderRepository;
import swp391.com.swp391.repository.StaffRepository;
import swp391.com.swp391.repository.StatusRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatusService {
    @Autowired
    StatusRepository statusRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    OrderRepository orderRepository;
    public Status createStatus(StatusCreationRequest request){
        Status status = new Status();
        Staff staff = staffRepository.findById(String.valueOf(request.getStaffId()))
                .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_EXISTED));
        status.setStaffId(staff);

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        status.setOrderId(order);
        status.setStatusDescription(request.getStatusDescription());
        status.setStatusDate(LocalDateTime.now());
        status.setNumberOfUpdate(0);
        return statusRepository.save(status);
    }

    public List<Status> getAllStatus(){
        return statusRepository.findAll();
    }
}
