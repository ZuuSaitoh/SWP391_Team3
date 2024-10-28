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
public class BookingServiceUpdateStatusRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    boolean status;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public boolean isStatus() {
        return status;
    }

    public void setStatus(@NotNull(message = "ENTER_ALL_FIELDS") boolean status) {
        this.status = status;
    }
}
