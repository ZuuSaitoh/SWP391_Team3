package swp391.com.swp391.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@Entity
@Table(name = "design")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int design_id;

    public Design(int design_id) {
        this.design_id = design_id;
    }

    public int getDesign_id() {
        return design_id;
    }

    public void setDesign_id(int design_id) {
        this.design_id = design_id;
    }
}
