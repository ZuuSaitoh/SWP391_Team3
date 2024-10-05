package swp391.com.swp391.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffResponse {
    private int staffId;
    private String username;
    private String password;
    private String mail;
    private String fullName;
    private String address;
    private String phone;
    private String role;
}
