package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingServiceCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int staffId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int customerId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int serviceId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    float price;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int usingPoint;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(@NotNull(message = "ENTER_ALL_FIELDS") int staffId) {
        this.staffId = staffId;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(@NotNull(message = "ENTER_ALL_FIELDS") int customerId) {
        this.customerId = customerId;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(@NotNull(message = "ENTER_ALL_FIELDS") int serviceId) {
        this.serviceId = serviceId;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public float getPrice() {
        return price;
    }

    public void setPrice(@NotNull(message = "ENTER_ALL_FIELDS") float price) {
        this.price = price;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getUsingPoint() {
        return usingPoint;
    }

    public void setUsingPoint(@NotNull(message = "ENTER_ALL_FIELDS") int usingPoint) {
        this.usingPoint = usingPoint;
    }
}
