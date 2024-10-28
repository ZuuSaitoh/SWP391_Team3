package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceUpdateRequest {    @NotBlank(message = "ENTER_ALL_FIELDS")
    String service_name;
    @NotNull(message = "ENTER_ALL_FIELDS")
    double price;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    String description;
    @NotBlank(message = "ENTER_ALL_FIELDS")
    @Pattern(regexp = "Cleaning Pond Service|Maintenance", message = "INVALID_SERVICE_TYPE")
    String service_type;

    public String getService_name() {
        return service_name;
    }

    public void setService_name(String service_name) {
        this.service_name = service_name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getService_type() {
        return service_type;
    }

    public void setService_type(String service_type) {
        this.service_type = service_type;
    }

}
