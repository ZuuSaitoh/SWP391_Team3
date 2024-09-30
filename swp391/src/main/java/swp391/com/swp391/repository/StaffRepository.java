package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.com.swp391.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {
}
