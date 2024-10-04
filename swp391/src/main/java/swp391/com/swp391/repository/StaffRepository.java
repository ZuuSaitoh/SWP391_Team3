package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
}
