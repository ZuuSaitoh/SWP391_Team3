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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
