package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffCreattionRequest {
    @Size(min = 3,message = "USERNAME_INVALID")
    String username;
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
    String mail;

    public @Size(min = 3, message = "USERNAME_INVALID") String getUsername() {
        return username;
    }

    public void setUsername(@Size(min = 3, message = "USERNAME_INVALID") String username) {
        this.username = username;
    }

    public @Size(min = 8, message = "INVALID_PASSWORD") String getPassword() {
        return password;
    }

    public void setPassword(@Size(min = 8, message = "INVALID_PASSWORD") String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
