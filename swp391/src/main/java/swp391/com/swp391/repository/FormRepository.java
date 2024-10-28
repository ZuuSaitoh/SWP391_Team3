package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.Form;

import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<Form, Integer> {
    Optional<Form> findByCustomer_id(int id);
}
