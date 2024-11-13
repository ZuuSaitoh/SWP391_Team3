package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int orderId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String statusDescription;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int staffId;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(@NotNull(message = "ENTER_ALL_FIELDS") int orderId) {
        this.orderId = orderId;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getStatusDescription() {
        return statusDescription;
    }

    public void setStatusDescription(@NotNull(message = "ENTER_ALL_FIELDS") String statusDescription) {
        this.statusDescription = statusDescription;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(@NotNull(message = "ENTER_ALL_FIELDS") int staffId) {
        this.staffId = staffId;
    }
}
