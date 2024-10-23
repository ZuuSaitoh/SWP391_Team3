package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.OrderCreationRequest;
import swp391.com.swp391.dto.request.OrderUpdateDesignRequest;
import swp391.com.swp391.dto.request.OrderUpdateFeedbackRequest;
import swp391.com.swp391.entity.*;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.CustomerRepository;
import swp391.com.swp391.repository.DesignRepository;
import swp391.com.swp391.repository.OrderRepository;
import swp391.com.swp391.repository.StaffRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    StaffRepository staffRepository;
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    DesignRepository designRepository;

    @Autowired
    FormService formService;


    public Order createOrder(OrderCreationRequest request){
        Order order = new Order();

        Customer customer = customerRepository.findById(String.valueOf(request.getCustomer_id()))
                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));

        order.setCustomer(customer);

        Staff staff = staffRepository.findById(String.valueOf(request.getStaff_id()))
                .orElseThrow(()->new AppException(ErrorCode.STAFF_NOT_EXISTED));

        order.setStaff(staff);
        Form form = formService.findById(request.getForm_id());
        order.setForm(form);

//        order.setDesign_id(request.getDesign_id());
        order.setOrder_date(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public List<Order> getAllOrder(){
        return orderRepository.findAll();
    }

    public Order getOrderById(int id){
        return orderRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_EXISTED));
    }

    public Order updateEndDate(int order_id){
        Order order = getOrderById(order_id);
        order.setEnd_date(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public Order updateRatingAndFeedback(int order_id, OrderUpdateFeedbackRequest request){
        Order order = getOrderById(order_id);
        order.setFeedback(request.getFeedback());
        order.setRating(request.getRating());
        order.setFeedback_date(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public Optional<List<Order>> getOrderByCustomerId(int id){
        return orderRepository.findByCustomer_Id(id);
    }

    public Optional<List<Order>> getOrderByStaffId(int id){
        return orderRepository.findByStaff_staffId(id);
    }

    public Order updateDesignById(int order_id, OrderUpdateDesignRequest request){
        Order order = getOrderById(order_id);
        Design design = designRepository.findById(request.getDesignId())
                .orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_EXISTED));
        order.setDesign(design);
        return orderRepository.save(order);
    }
}
