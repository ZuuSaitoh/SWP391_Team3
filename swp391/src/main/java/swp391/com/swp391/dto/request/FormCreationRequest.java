package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FormCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int customerId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String location;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String style;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String area;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String stage;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String contactMethod;
    @Pattern(regexp = "^(\\+84|0[3|5|7|8|9])+([0-9]{8})$", message = "PHONE_NUMBER_INVALID", flags = Pattern.Flag.CASE_INSENSITIVE)
    String phone;

    public @Pattern(regexp = "^(\\+84|0[3|5|7|8|9])+([0-9]{8})$", message = "PHONE_NUMBER_INVALID", flags = Pattern.Flag.CASE_INSENSITIVE) String getPhone() {
        return phone;
    }

    public void setPhone(@Pattern(regexp = "^(\\+84|0[3|5|7|8|9])+([0-9]{8})$", message = "PHONE_NUMBER_INVALID", flags = Pattern.Flag.CASE_INSENSITIVE) String phone) {
        this.phone = phone;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(@NotNull(message = "ENTER_ALL_FIELDS") int customerId) {
        this.customerId = customerId;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getLocation() {
        return location;
    }

    public void setLocation(@NotNull(message = "ENTER_ALL_FIELDS") String location) {
        this.location = location;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getStyle() {
        return style;
    }

    public void setStyle(@NotNull(message = "ENTER_ALL_FIELDS") String style) {
        this.style = style;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getArea() {
        return area;
    }

    public void setArea(@NotNull(message = "ENTER_ALL_FIELDS") String area) {
        this.area = area;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getStage() {
        return stage;
    }

    public void setStage(@NotNull(message = "ENTER_ALL_FIELDS") String stage) {
        this.stage = stage;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(@NotNull(message = "ENTER_ALL_FIELDS") String contactMethod) {
        this.contactMethod = contactMethod;
    }
}
