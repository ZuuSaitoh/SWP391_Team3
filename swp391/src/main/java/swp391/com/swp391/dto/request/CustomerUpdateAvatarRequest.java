package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerUpdateAvatarRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    String avatar;

    public @NotNull(message = "ENTER_ALL_FIELDS") String getAvatar() {
        return avatar;
    }

    public void setAvatar(@NotNull(message = "ENTER_ALL_FIELDS") String avatar) {
        this.avatar = avatar;
    }
}
