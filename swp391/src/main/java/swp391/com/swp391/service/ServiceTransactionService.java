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
        serviceTransaction.setBookingService(bookingService);
        serviceTransaction.setDepositPerson(bookingService.getCustomer());
        serviceTransaction.setDepositDate(LocalDateTime.now());
        return (ServiceTransaction) serviceTransactionRepository.save(serviceTransaction);
    }
}
