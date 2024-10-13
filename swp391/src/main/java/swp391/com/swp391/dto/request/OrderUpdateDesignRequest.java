package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderUpdateDesignRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int designId;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getDesignId() {
        return designId;
    }

    public void setDesignId(@NotNull(message = "ENTER_ALL_FIELDS") int designId) {
        this.designId = designId;
    }
}
