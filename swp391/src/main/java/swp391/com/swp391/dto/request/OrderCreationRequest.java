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
public class OrderCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int customer_id;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int staff_id;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int form_id;
//    @NotNull(message = "ENTER_ALL_FIELDS")
    int design_id;

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getForm_id() {
        return form_id;
    }

    public void setForm_id(@NotNull(message = "ENTER_ALL_FIELDS") int form_id) {
        this.form_id = form_id;
    }

    public int getDesign_id() {
        return design_id;
    }

    public void setDesign_id(int design_id) {
        this.design_id = design_id;
    }


}
