package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateRejectReasonRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    String rejectReason;

    public @NotNull(message = "ENTER_ALL_FIELDS") String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(@NotNull(message = "ENTER_ALL_FIELDS") String rejectReason) {
        this.rejectReason = rejectReason;
    }
}
