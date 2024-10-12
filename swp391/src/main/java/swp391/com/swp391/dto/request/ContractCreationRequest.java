package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContractCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int orderId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int uploadStaff;
//    @NotNull(message = "ENTER_ALL_FIELDS")
//    MultipartFile imageData;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String imageData;

    @NotNull(message = "ENTER_ALL_FIELDS")
    String description;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getUploadStaff() {
        return uploadStaff;
    }

    public void setUploadStaff(int uploadStaff) {
        this.uploadStaff = uploadStaff;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    //    public MultipartFile getImageData() {
//        return imageData;
//    }
//
//    public void setImageData(MultipartFile imageData) {
//        this.imageData = imageData;
//    }
//    public byte[] getImageData() {
//        return imageData;
//    }
//
//    public void setImageData(byte[] imageData) {
//        this.imageData = imageData;
//    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
