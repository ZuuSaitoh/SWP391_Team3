package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffCreationRequest {
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Size(min = 3,message = "USERNAME_INVALID")
    String username;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Size(min = 8, message = "INVALID_PASSWORD")
    String confirm_password;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Email(message = "INVALID_EMAIL")
    String mail;

    public @NotBlank(message = "ENTER_ALL_FIELDS") @Size(min = 3, message = "USERNAME_INVALID") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "ENTER_ALL_FIELDS") @Size(min = 3, message = "USERNAME_INVALID") String username) {
        this.username = username;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") @Size(min = 8, message = "INVALID_PASSWORD") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "ENTER_ALL_FIELDS") @Size(min = 8, message = "INVALID_PASSWORD") String password) {
        this.password = password;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") @Size(min = 8, message = "INVALID_PASSWORD") String getConfirm_password() {
        return confirm_password;
    }

    public void setConfirm_password(@NotBlank(message = "ENTER_ALL_FIELDS") @Size(min = 8, message = "INVALID_PASSWORD") String confirm_password) {
        this.confirm_password = confirm_password;
    }

    public @NotBlank(message = "ENTER_ALL_FIELDS") @Email(message = "INVALID_EMAIL") String getMail() {
        return mail;
    }

    public void setMail(@NotBlank(message = "ENTER_ALL_FIELDS") @Email(message = "INVALID_EMAIL") String mail) {
        this.mail = mail;
    }
}
