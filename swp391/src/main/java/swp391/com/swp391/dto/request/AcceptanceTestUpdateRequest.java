package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AcceptanceTestUpdateRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    String imageData;

    @NotNull(message = "ENTER_ALL_FIELDS")
    String description;

    public @NotNull(message = "ENTER_ALL_FIELDS") String getImageData() {
        return imageData;
    }

    public void setImageData(@NotNull(message = "ENTER_ALL_FIELDS") String imageData) {
        this.imageData = imageData;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getDescription() {
        return description;
    }

    public void setDescription(@NotNull(message = "ENTER_ALL_FIELDS") String description) {
        this.description = description;
    }
}
