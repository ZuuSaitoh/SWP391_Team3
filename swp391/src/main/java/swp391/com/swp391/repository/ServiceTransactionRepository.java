package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.ServiceTransaction;

import java.util.Optional;

@Repository
public interface ServiceTransactionRepository extends JpaRepository<ServiceTransaction, Integer> {
    Boolean existsByBookingService_bookingServiceId(int bookingServiceId);
}
