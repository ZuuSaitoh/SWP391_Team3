package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StatusUpdateCompleteRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    boolean complete;
//    @NotNull(message = "ENTER_ALL_FIELDS")
    String rejectReason;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public boolean isComplete() {
        return complete;
    }

    public void setComplete(@NotNull(message = "ENTER_ALL_FIELDS") boolean complete) {
        this.complete = complete;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }
//    @NotNull(message = "ENTER_ALL_FIELDS")
//    public byte getComplete() {
//        return complete;
//    }
//
//    public void setComplete(@NotNull(message = "ENTER_ALL_FIELDS") byte complete) {
//        this.complete = complete;
//    }
}
