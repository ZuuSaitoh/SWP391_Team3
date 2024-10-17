package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.StatusCreationRequest;
import swp391.com.swp391.dto.request.StatusUpdateCompleteRequest;
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
import java.util.Optional;

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
        status.setStaff(staff);

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        status.setOrder(order);
        status.setStatusDescription(request.getStatusDescription());
        status.setStatusDate(LocalDateTime.now());
        status.setNumberOfUpdate(0);
        return statusRepository.save(status);
    }

    public List<Status> getAllStatus(){
        return statusRepository.findAll();
    }

    public Optional<List<Status>> getAllStatusByOrderId(int id){
        return statusRepository.findByOrder_orderId(id);
    }

    public Optional<List<Status>> getAllStatusByStaffId(int id){
        return statusRepository.findByStaff_staffId(id);
    }

    public Status getStatusByStatusId(int id){
        return statusRepository.findById(id)
                .orElseThrow(() ->new AppException(ErrorCode.STATUS_NOT_EXISTED));
    }

    public Status updateCompleteStatus(int id, StatusUpdateCompleteRequest request){
        Status status = getStatusByStatusId(id);
        if (status.isComplete()){
            throw new AppException(ErrorCode.COMPLETE_TRUE);
        }
        status.setComplete(request.isComplete());
        status.setCheckDate(LocalDateTime.now());
        return statusRepository.save(status);
    }

    public Status statusUpdateNumberOfUpdate(int id){
        Status status = getStatusByStatusId(id);
        if (status.isComplete()){
            throw new AppException(ErrorCode.COMPLETE_TRUE);
        }
        if (status.getNumberOfUpdate()<3){
            status.setNumberOfUpdate(status.getNumberOfUpdate()+1);
        } else{
            throw new AppException(ErrorCode.THREE_TIME_UPDATE);
        }
        return statusRepository.save(status);
    }

    public void deleteStatus(int id){
        if (!statusRepository.existsById(id)){
            throw new AppException(ErrorCode.STATUS_NOT_EXISTED);
        }
        statusRepository.deleteById(id);
    }
}
