package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DesignCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int uploadStaff;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String designName;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String imageData;
//    @NotNull(message = "ENTER_ALL_FIELDS")
//    LocalDateTime designDate;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String designVersion;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getUploadStaff() {
        return uploadStaff;
    }

    public void setUploadStaff(@NotNull(message = "ENTER_ALL_FIELDS") int uploadStaff) {
        this.uploadStaff = uploadStaff;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getDesignName() {
        return designName;
    }

    public void setDesignName(@NotNull(message = "ENTER_ALL_FIELDS") String designName) {
        this.designName = designName;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getImageData() {
        return imageData;
    }

    public void setImageData(@NotNull(message = "ENTER_ALL_FIELDS") String imageData) {
        this.imageData = imageData;
    }

//    public @NotNull(message = "ENTER_ALL_FIELDS") LocalDateTime getDesignDate() {
//        return designDate;
//    }
//
//    public void setDesignDate(@NotNull(message = "ENTER_ALL_FIELDS") LocalDateTime designDate) {
//        this.designDate = designDate;
//    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getDesignVersion() {
        return designVersion;
    }

    public void setDesignVersion(@NotNull(message = "ENTER_ALL_FIELDS") String designVersion) {
        this.designVersion = designVersion;
    }
}
