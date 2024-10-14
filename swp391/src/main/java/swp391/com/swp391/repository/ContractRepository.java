package swp391.com.swp391.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.com.swp391.entity.Contract;
import swp391.com.swp391.entity.Order;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContractRepository  extends JpaRepository<Contract, Integer> {
    Optional <List<Contract>> findByOrder_orderId(int id);
}
