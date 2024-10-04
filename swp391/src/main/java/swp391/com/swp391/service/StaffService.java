package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.StaffCreattionRequest;
import swp391.com.swp391.dto.request.StaffUpdateRequest;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.mapper.CustomerMapper;
import swp391.com.swp391.repository.StaffRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    CustomerMapper customerMapper;

    //hàm này dùng để tạo ra 1 staff mới
    public Staff createStaff(StaffCreattionRequest request){
        Staff staff = new Staff();
        staff.setUsername(request.getUsername());
        staff.setPassword(request.getPassword());
        staff.setMail(request.getMail());
        return staffRepository.save(staff);
    }

    //hàm này dùng để xem danh sách tất cả Staff
    public List<Staff> viewAllStaffLists(){
        return staffRepository.findAll();
    }

    //hàm này dùng để xem thông tin của nhân viên dựa trên staffId
    public Staff viewStaffById(String id){
        return staffRepository.findById(id).
                orElseThrow(() -> new RuntimeException("User not found")); //lambda expression
    }

    //hàm này dùng để cập nhật thông tin của staff dựa trên staffId
    public Staff updateStaff(String staffId, StaffUpdateRequest request){
        Staff staff = viewStaffById(staffId);
        staff.setPassword(request.getPassword());
        staff.setMail(request.getMail());
        staff.setFullName(request.getFullName());
        staff.setAddress(request.getAddress());
        staff.setPhone(request.getPhone());
        return staffRepository.save(staff);
    }

    //hàm này dùng để xóa Staff dựa trên staffId
    public void deleteStaff(String staffId){
        staffRepository.deleteById(staffId);
    }
}
