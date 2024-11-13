package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AcceptanceTestCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int orderId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int consultingStaff;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int designStaff;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int constructionStaff;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String imageData;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String description;

    public AcceptanceTestCreationRequest() {
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(@NotNull(message = "ENTER_ALL_FIELDS") int orderId) {
        this.orderId = orderId;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getConsultingStaff() {
        return consultingStaff;
    }

    public void setConsultingStaff(@NotNull(message = "ENTER_ALL_FIELDS") int consultingStaff) {
        this.consultingStaff = consultingStaff;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getDesignStaff() {
        return designStaff;
    }

    public void setDesignStaff(@NotNull(message = "ENTER_ALL_FIELDS") int designStaff) {
        this.designStaff = designStaff;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getConstructionStaff() {
        return constructionStaff;
    }

    public void setConstructionStaff(@NotNull(message = "ENTER_ALL_FIELDS") int constructionStaff) {
        this.constructionStaff = constructionStaff;
    }

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
