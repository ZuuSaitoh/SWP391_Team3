package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.Design;

@Repository
public interface DesignRepository extends JpaRepository<Design, Integer> {
}
