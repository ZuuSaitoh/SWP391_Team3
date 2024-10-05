package swp391.com.swp391.mapper;

import org.mapstruct.Mapper;
import swp391.com.swp391.dto.request.StaffCreationRequest;
import swp391.com.swp391.dto.response.StaffResponse;
import swp391.com.swp391.entity.Staff;

@Mapper(componentModel = "spring")
public interface StaffMapper {
    Staff toStaff(StaffCreationRequest request);
    StaffResponse toStaffResponse(Staff staff);
}
