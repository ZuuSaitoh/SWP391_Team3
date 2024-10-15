package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.AcceptanceTestCreationRequest;
import swp391.com.swp391.dto.request.AcceptanceTestUpdateRequest;
import swp391.com.swp391.entity.AcceptanceTest;
import swp391.com.swp391.entity.Order;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.AcceptanceTestRepository;
import swp391.com.swp391.repository.OrderRepository;
import swp391.com.swp391.repository.StaffRepository;

import java.util.List;
import java.util.Optional;

@Service

public class AcceptanceTestService {
    @Autowired
    AcceptanceTestRepository acceptanceTestRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    StaffRepository staffRepository;

    public AcceptanceTest createAcceptanceTest(AcceptanceTestCreationRequest request){
        AcceptanceTest acceptanceTest = new AcceptanceTest();

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(()-> new AppException(ErrorCode.ORDER_NOT_EXISTED));
        acceptanceTest.setOrder(order);

        Staff consultingStaff = staffRepository.findById(String.valueOf(request.getConsultingStaff()))
                .orElseThrow(()-> new AppException(ErrorCode.CONSULTING_STAFF_NOT_EXISTED));
        acceptanceTest.setConsultingStaff(consultingStaff);

        Staff designStaff = staffRepository.findById(String.valueOf(request.getDesignStaff()))
                .orElseThrow(()-> new AppException(ErrorCode.DESIGN_STAFF_NOT_EXISTED));
        acceptanceTest.setDesignStaff(designStaff);

        Staff constructionStaff = staffRepository.findById(String.valueOf(request.getConstructionStaff()))
                .orElseThrow(()-> new AppException(ErrorCode.CONSTRUCTION_STAFF_NOT_EXISTED));
        acceptanceTest.setConstructionStaff(constructionStaff);

        acceptanceTest.setImageData(request.getImageData());
        acceptanceTest.setDescription(request.getDescription());
        return acceptanceTestRepository.save(acceptanceTest);
    }

    public List<AcceptanceTest> getAllAcceptanceTest() { return acceptanceTestRepository.findAll(); }

    public AcceptanceTest getAcceptanceTestById(int id){
        return acceptanceTestRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.ACCEPTANCE_TEST_NOT_EXISTED));
    }

    public void deleteAcceptanceTestById(int id) { acceptanceTestRepository.deleteById(id); }

    public AcceptanceTest updateAcceptanceTestById(int id, AcceptanceTestUpdateRequest request){
        AcceptanceTest acceptanceTest = acceptanceTestRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.ACCEPTANCE_TEST_NOT_EXISTED));
        acceptanceTest.setImageData(request.getImageData());
        acceptanceTest.setDescription(request.getDescription());
        return acceptanceTestRepository.save(acceptanceTest);
    }

    public Optional<List<AcceptanceTest>> getAllAcceptanceTestByOrderId(int orderId){
        return acceptanceTestRepository.findByOrder_orderId(orderId);
    }
}
