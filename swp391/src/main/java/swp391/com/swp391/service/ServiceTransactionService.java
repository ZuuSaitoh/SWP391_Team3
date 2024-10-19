package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.ServiceTransactionCreationRequest;
import swp391.com.swp391.entity.BookingService;
import swp391.com.swp391.entity.ServiceTransaction;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.BookingServiceRepository;
import swp391.com.swp391.repository.ServiceTransactionRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ServiceTransactionService {
    @Autowired
    ServiceTransactionRepository serviceTransactionRepository;
    @Autowired
    BookingServiceRepository bookingServiceRepository;

    public ServiceTransaction createTransactionByCash(ServiceTransactionCreationRequest request){
        ServiceTransaction serviceTransaction = new ServiceTransaction();
        BookingService bookingService = bookingServiceRepository.findById(request.getBookingServiceId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOKING_SERVICE_NOT_EXISTED));
        if (serviceTransactionRepository.existsByBookingService_bookingServiceId(request.getBookingServiceId())){
            throw new AppException(ErrorCode.SERVICE_TRANSACTION_DONE);
        }
        serviceTransaction.setBookingService(bookingService);
        serviceTransaction.setDepositPerson(bookingService.getCustomer());
        serviceTransaction.setDepositDate(LocalDateTime.now());
        serviceTransaction.setDepositMethod("Cash");
        return (ServiceTransaction) serviceTransactionRepository.save(serviceTransaction);
    }

    public List<ServiceTransaction> getAllTransaction(){
        return serviceTransactionRepository.findAll();
    }

    public ServiceTransaction getTransactionById(int id){
        return serviceTransactionRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.TRANSACTION_NOT_EXISTED));
    }
    public void deleteTransaction(int id){
        if (!serviceTransactionRepository.existsById(id)){
            throw new AppException(ErrorCode.TRANSACTION_NOT_EXISTED);
        }
        serviceTransactionRepository.deleteById(id);
    }
    public void deleteAllTransaction(){
        serviceTransactionRepository.deleteAll();
    }
}
