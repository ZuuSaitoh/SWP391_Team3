package swp391.com.swp391.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.StaffCreattionRequest;
import swp391.com.swp391.dto.request.StaffUpdateRequest;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.service.StaffService;

import java.util.List;

@RestController
@RequestMapping("/staffs") //http://localhost:8080/staffs/...
public class StaffController {
    @Autowired
    private StaffService staffService;

    //hàm này dùng để tạo 1 nhân viên mới
    @PostMapping("/create")
    public Staff createStaff(@RequestBody StaffCreattionRequest request){
        return staffService.createStaff(request);
    }

    //hàm này dùng để xem danh sách toàn bộ Staff
    @GetMapping("/view")
    List<Staff> viewAllStaffLists(){
        return staffService.viewAllStaffLists();
    }

    //hàm này dùng để xem thông tin của Staff dựa vào staffId
    @GetMapping("/{staffId}")
    Staff viewStaffById(@PathVariable("staffId") String userId){
        return staffService.viewStaffById(userId);
    }

    //hàm này dùng để cập nhật thông tin của staff dựa trên staffId
    @PutMapping("/{staffId}")
    Staff updateStaff(@PathVariable String staffId, @RequestBody StaffUpdateRequest request){
        return staffService.updateStaff(staffId, request);
    }

    //hàm này dùng để xóa Staff dựa trên staffId
    //hàm này chưa hoàn thiện
    @DeleteMapping("/{staffId}")
    String deleteUser(@PathVariable String userId){
        staffService.deleteStaff(userId);
        return "Staff has been deleted";
    }
}
