package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingServiceUpdateFeedbackRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    String feedback;

    public @NotNull(message = "ENTER_ALL_FIELDS") String getFeedback() {
        return feedback;
    }

    public void setFeedback(@NotNull(message = "ENTER_ALL_FIELDS") String feedback) {
        this.feedback = feedback;
    }
}
