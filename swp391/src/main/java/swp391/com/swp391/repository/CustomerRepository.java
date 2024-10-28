package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.Customer;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    boolean existsByUsername(String username);
    boolean existsByMail(String mail);
    Optional <Customer> findByUsername(String username);

    Optional<Customer> findByMail(String mail);
}
