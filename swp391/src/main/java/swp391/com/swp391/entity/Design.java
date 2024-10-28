package swp391.com.swp391.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@Entity
@Table(name = "design")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Design {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "design_id")
    int designId;

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "staff_id", nullable = false)
    Staff staff;

    @Column(name = "design_name")
    String designName;

    @Column(name = "image_data")
    String imageData;

    @Column(name = "design_date")
    LocalDateTime designDate;

    @Column(name = "design_version")
    String designVersion;

    public Design() {
    }

    public int getDesignId() {
        return designId;
    }

    public void setDesignId(int designId) {
        this.designId = designId;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public String getDesignName() {
        return designName;
    }

    public void setDesignName(String designName) {
        this.designName = designName;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public LocalDateTime getDesignDate() {
        return designDate;
    }

    public void setDesignDate(LocalDateTime designDate) {
        this.designDate = designDate;
    }

    public String getDesignVersion() {
        return designVersion;
    }

    public void setDesignVersion(String designVersion) {
        this.designVersion = designVersion;
    }
}
