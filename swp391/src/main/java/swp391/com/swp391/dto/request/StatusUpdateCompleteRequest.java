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
    byte complete;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public byte getComplete() {
        return complete;
    }

    public void setComplete(@NotNull(message = "ENTER_ALL_FIELDS") byte complete) {
        this.complete = complete;
    }
}
