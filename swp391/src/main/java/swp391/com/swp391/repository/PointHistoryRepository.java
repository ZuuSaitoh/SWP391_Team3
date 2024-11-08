package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.com.swp391.entity.Form;
import swp391.com.swp391.entity.PointHistory;

import java.util.List;
import java.util.Optional;

public interface PointHistoryRepository extends JpaRepository<PointHistory, Integer> {
    Optional<List<PointHistory>> findByCustomer_id(int id);
    Boolean existsByCustomer_id(int id);
}
