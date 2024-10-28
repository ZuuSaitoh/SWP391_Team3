package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffUpdateRequest {
    @NotBlank(message = "ENTER_ALL_FIELDS")
    String password;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    String mail;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    String fullName;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    String address;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Pattern(regexp = "^(\\+84|0[3|5|7|8|9])+([0-9]{8})$", message = "PHONE_NUMBER_INVALID", flags = Pattern.Flag.CASE_INSENSITIVE)
    String phone;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Pattern(regexp = "Manager|Design Staff|Construction Staff|Consulting Staff", message = "INVALID_STAFF_TYPE")
    String role;

    public @NotBlank(message = "ENTER_ALL_FIELDS") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "ENTER_ALL_FIELDS") String password) {
        this.password = password;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") String getMail() {
        return mail;
    }

    public void setMail(@NotBlank(message = "ENTER_ALL_FIELDS") String mail) {
        this.mail = mail;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") String getFullName() {
        return fullName;
    }

    public void setFullName(@NotBlank(message = "ENTER_ALL_FIELDS") String fullName) {
        this.fullName = fullName;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") String getAddress() {
        return address;
    }

    public void setAddress(@NotBlank(message = "ENTER_ALL_FIELDS") String address) {
        this.address = address;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") @Pattern(regexp = "^(\\+84|0[3|5|7|8|9])+([0-9]{8})$", message = "PHONE_NUMBER_INVALID", flags = Pattern.Flag.CASE_INSENSITIVE) String getPhone() {
        return phone;
    }

    public void setPhone(@NotBlank(message = "ENTER_ALL_FIELDS") @Pattern(regexp = "^(\\+84|0[3|5|7|8|9])+([0-9]{8})$", message = "PHONE_NUMBER_INVALID", flags = Pattern.Flag.CASE_INSENSITIVE) String phone) {
        this.phone = phone;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") @Pattern(regexp = "Manager|Design Staff|Construction Staff|Consulting Staff", message = "INVALID_STAFF_TYPE") String getRole() {
        return role;
    }

    public void setRole(@NotBlank(message = "ENTER_ALL_FIELDS") @Pattern(regexp = "Manager|Design Staff|Construction Staff|Consulting Staff", message = "INVALID_STAFF_TYPE") String role) {
        this.role = role;
    }
}
