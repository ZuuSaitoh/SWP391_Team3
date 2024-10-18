package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.BookingService;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingServiceRepository extends JpaRepository<BookingService, Integer> {
    Optional<List<BookingService>> findByStaff_staffId(int id);

    Optional<List<BookingService>> findByCustomer_Id(int id);

    Optional<List<BookingService>> findByService_serviceId(int id);
}
