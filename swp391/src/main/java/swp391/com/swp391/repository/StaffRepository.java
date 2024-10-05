package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.Staff;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, String> {
    boolean existsByUsername(String username);
    boolean existsByMail(String mail);
    Optional<Staff> findByUsername(String username);
}
