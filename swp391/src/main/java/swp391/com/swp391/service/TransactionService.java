package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.TransactionCreationRequest;
import swp391.com.swp391.entity.Customer;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.entity.Transaction;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.CustomerRepository;
import swp391.com.swp391.repository.OrderRepository;
import swp391.com.swp391.repository.TransactionRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    CustomerRepository customerRepository;

    public Transaction createTransaction(TransactionCreationRequest request){
        Transaction transaction = new Transaction();
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(()->new AppException(ErrorCode.ORDER_NOT_EXISTED));
        Customer customer = customerRepository.findById(String.valueOf(request.getDepositPersonId()))
                .orElseThrow(()->new AppException(ErrorCode.USER_NOT_EXISTED));
        transaction.setOrder(order);
        transaction.setDeposit(request.getDeposit());
        transaction.setDepositDescription(request.getDepositDescription());
        transaction.setDepositMethod(request.getDepositMethod());
        transaction.setDepositDate(LocalDateTime.now());
        transaction.setDepositPerson(customer);
        if (request.getTransactionNumber()!=null && !request.getTransactionNumber().isEmpty()){
            transaction.setTransactionNumber(request.getTransactionNumber());
        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransaction(){
        return transactionRepository.findAll();
    }

    public Transaction getTransactionByTransactionId(int id){
        return transactionRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.TRANSACTION_NOT_EXISTED));
    }
    public Optional<List<Transaction>> getAllTransactionByOrderId(int id){
        return transactionRepository.findByOrder_OrderId(id);
    }
}
