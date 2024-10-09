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
    int designId;

    public Design(int designId) {
        this.designId = designId;
    }

    public int getDesignId() {
        return designId;
    }

    public void setDesignId(int designId) {
        this.designId = designId;
    }
}
