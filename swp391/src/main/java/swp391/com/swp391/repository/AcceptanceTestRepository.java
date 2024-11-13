package swp391.com.swp391.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.AcceptanceTest;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcceptanceTestRepository extends JpaRepository<AcceptanceTest, Integer> {
    Optional<List<AcceptanceTest>> findByOrder_orderId(int id);
}
