package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingServiceAddStaffCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int staffId;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(@NotNull(message = "ENTER_ALL_FIELDS") int staffId) {
        this.staffId = staffId;
    }
}
