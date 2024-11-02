package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
    @Min(value = 1, message = "RATING_MIN")
    @Max(value = 5, message = "RATING_MAX")
    int rating;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String feedback;

    @NotNull(message = "ENTER_ALL_FIELDS")
    @Min(value = 1, message = "RATING_MIN")
    @Max(value = 5, message = "RATING_MAX")
    public int getRating() {
        return rating;
    }

    public void setRating(@NotNull(message = "ENTER_ALL_FIELDS") @Min(value = 1, message = "RATING_MIN") @Max(value = 5, message = "RATING_MAX") int rating) {
        this.rating = rating;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getFeedback() {
        return feedback;
    }

    public void setFeedback(@NotNull(message = "ENTER_ALL_FIELDS") String feedback) {
        this.feedback = feedback;
    }
}
