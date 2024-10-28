package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.OrderCreationRequest;
import swp391.com.swp391.dto.request.OrderUpdateDesignRequest;
import swp391.com.swp391.dto.request.OrderUpdateFeedbackRequest;
import swp391.com.swp391.entity.*;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.*;

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

    @Autowired
    TransactionService transactionService;

    @Autowired
    TransactionRepository transactionRepository;


    public Order createOrder(OrderCreationRequest request){
        Order order = new Order();

        Customer customer = customerRepository.findById(String.valueOf(request.getCustomer_id()))
                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));

        order.setCustomer(customer);

        Staff staff = staffRepository.findById(String.valueOf(request.getStaff_id()))
                .orElseThrow(()->new AppException(ErrorCode.STAFF_NOT_EXISTED));

        order.setStaff(staff);
        if(orderRepository.existsByForm_FormId(request.getForm_id())){
            throw new AppException(ErrorCode.ORDER_CREATED);
        }
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
        if (order.getFeedback_date()!=null){
            throw new AppException(ErrorCode.ORDER_COMPLETE);
        }
        order.setEnd_date(LocalDateTime.now());
        if (transactionRepository.existsByOrder_OrderId(order_id)) {
            Optional<List<Transaction>> transaction = transactionService.getAllTransactionByOrderId(order_id);
            double total = 0;
            int point = 0;
            if (transaction.isPresent()) {
                List<Transaction> transactionList = transaction.get();
                for (Transaction transaction1 : transactionList){
                    if (transaction1.getDepositMethod()!=null) {
                        total += transaction1.getDeposit();
                    }
                }
                point = (int) Math.floor(total/100000);
                Customer customer = order.getCustomer();
                customer.setPoint(customer.getPoint() + point);
                customerRepository.save(customer);
            }
        }
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

    public void deleteOrderByOrderId(int id){
        orderRepository.deleteById(id);
    }
}
