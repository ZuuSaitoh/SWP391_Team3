package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.DiscountCreationRequest;
import swp391.com.swp391.dto.request.DiscountUpdateRequest;
import swp391.com.swp391.entity.Discount;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.DiscountRepository;
import swp391.com.swp391.repository.StaffRepository;

import java.util.List;

@Service
public class DiscountService {
    @Autowired
    DiscountRepository discountRepository;
    @Autowired
    StaffRepository staffRepository;

    public Discount createDiscount(DiscountCreationRequest request){
        Discount discount = new Discount();

        Staff staff = staffRepository.findById(String.valueOf(request.getDiscountAuthorId()))
                .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_EXISTED));
        discount.setStaff(staff);

        discount.setDiscountName(request.getDiscountName());
        discount.setDiscountPercent(request.getDiscountPercent());
        discount.setStatus(request.isStatus());
        return discountRepository.save(discount);
    }

    public List<Discount> getAllDiscount(){
        return discountRepository.findAll();
    }

    public Discount getDiscountById(int id){
        return discountRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.DISCOUNT_NOT_EXISTED));
    }

    public void deleteDiscountById(int id){
        discountRepository.deleteById(id);
    }

    public Discount updateDiscountByDiscountId(int id, DiscountUpdateRequest request){
        Discount discount = discountRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.DISCOUNT_NOT_EXISTED));

        Staff staff = staffRepository.findById(String.valueOf(request.getDiscountAuthorId()))
                .orElseThrow(()-> new AppException(ErrorCode.STAFF_NOT_EXISTED));
        discount.setStaff(staff);

        discount.setDiscountName(request.getDiscountName());
        discount.setDiscountPercent(request.getDiscountPercent());
        discount.setStatus(request.isStatus());

        return discountRepository.save(discount);
    }
}
