package swp391.com.swp391.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.StaffCreationRequest;
import swp391.com.swp391.dto.request.StaffUpdateRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.service.StaffService;

import java.util.List;

@RestController
@RequestMapping("/staffs") //http://localhost:8080/staffs/...
public class StaffController {
    @Autowired
    private StaffService staffService;

    //hàm này dùng để tạo 1 nhân viên mới
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create")
    ApiResponse<Staff> createStaff(@RequestBody @Valid StaffCreationRequest request){
        ApiResponse<Staff> apiResponse = new ApiResponse<>();
        apiResponse.setResult(staffService.createStaff(request));
        return apiResponse;
    }

    //hàm này dùng để xem danh sách toàn bộ Staff
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<Staff>> viewAllStaffLists(){
        return new ApiResponse<List<Staff>>(9999,"List of Staffs",staffService.viewAllStaffLists());
    }

    //hàm này dùng để xem thông tin của Staff dựa vào staffId
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{staffId}")
    Staff viewStaffById(@PathVariable int staffId){
        return staffService.viewStaffById(staffId);
    }

    //hàm này dùng để cập nhật thông tin của staff dựa trên staffId
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/update/{staffId}")
    Staff updateStaff(@PathVariable int staffId, @RequestBody @Valid StaffUpdateRequest request){
        return staffService.updateStaff(staffId, request);
    }

    //hàm này dùng để xóa Staff dựa trên staffId
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{staffId}")
    ApiResponse<String> deleteStaff(@PathVariable int staffId){
        staffService.deleteStaff(staffId);
        return new ApiResponse<String>(1012,"Staff deleted","Staff deleted");
    }
}
