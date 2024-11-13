package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiscountUpdateRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int discountAuthorId;

    @NotNull(message = "ENTER_ALL_FIELDS")
    String discountName;

    @NotNull(message = "ENTER_ALL_FIELDS")
    float discountPercent;

    @NotNull(message = "ENTER_ALL_FIELDS")
    boolean status;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getDiscountAuthorId() {
        return discountAuthorId;
    }

    public void setDiscountAuthorId(@NotNull(message = "ENTER_ALL_FIELDS") int discountAuthorId) {
        this.discountAuthorId = discountAuthorId;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getDiscountName() {
        return discountName;
    }

    public void setDiscountName(@NotNull(message = "ENTER_ALL_FIELDS") String discountName) {
        this.discountName = discountName;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public float getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(@NotNull(message = "ENTER_ALL_FIELDS") float discountPercent) {
        this.discountPercent = discountPercent;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public boolean isStatus() {
        return status;
    }

    public void setStatus(@NotNull(message = "ENTER_ALL_FIELDS") boolean status) {
        this.status = status;
    }
}
