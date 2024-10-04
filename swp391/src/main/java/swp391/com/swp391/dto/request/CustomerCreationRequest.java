package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerCreationRequest {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

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

    public String getConfirm_password() {
        return confirm_password;
    }

    public void setConfirm_password(String confirm_password) {
        this.confirm_password = confirm_password;
    }
}
