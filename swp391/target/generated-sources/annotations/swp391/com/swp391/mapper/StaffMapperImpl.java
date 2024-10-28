package swp391.com.swp391.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import swp391.com.swp391.dto.request.StaffCreationRequest;
import swp391.com.swp391.dto.response.StaffResponse;
import swp391.com.swp391.entity.Staff;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class StaffMapperImpl implements StaffMapper {

    @Override
    public Staff toStaff(StaffCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Staff staff = new Staff();

        staff.setUsername( request.getUsername() );
        staff.setPassword( request.getPassword() );
        staff.setMail( request.getMail() );
        staff.setRole( request.getRole() );

        return staff;
    }

    @Override
    public StaffResponse toStaffResponse(Staff staff) {
        if ( staff == null ) {
            return null;
        }

        StaffResponse staffResponse = new StaffResponse();

        return staffResponse;
    }
}
