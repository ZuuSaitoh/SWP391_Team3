package swp391.com.swp391.mapper;

import ch.qos.logback.core.model.ComponentModel;
import org.mapstruct.Mapper;
import swp391.com.swp391.dto.request.StaffCreattionRequest;
import swp391.com.swp391.entity.Staff;

import java.awt.*;

@Mapper(componentModel = "Spring")
public interface StaffMapper {
    Staff toStaff(StaffCreattionRequest request);
}
