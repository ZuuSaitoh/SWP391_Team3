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
@Table(name = "acceptance_test")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AcceptanceTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "acceptance_test_id")
    int acceptanceTestId;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id", nullable = false)
    Order order;

    @ManyToOne
    @JoinColumn(name = "consulting_staff", referencedColumnName = "staff_id", nullable = false)
    Staff consultingStaff;

    @ManyToOne
    @JoinColumn(name = "design_staff", referencedColumnName = "staff_id", nullable = false)
    Staff designStaff;

    @ManyToOne
    @JoinColumn(name = "construction_staff", referencedColumnName = "staff_id", nullable = false)
    Staff constructionStaff;

    @Column(name = "finish_date")
    LocalDateTime finishDate;

    @Column(name = "image_data")
    String imageData;

    @Column(name = "description")
    String description;

    public AcceptanceTest() {
    }

    public int getAcceptanceTestId() {
        return acceptanceTestId;
    }

    public void setAcceptanceTestId(int acceptanceTestId) {
        this.acceptanceTestId = acceptanceTestId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Staff getConsultingStaff() {
        return consultingStaff;
    }

    public void setConsultingStaff(Staff consultingStaff) {
        this.consultingStaff = consultingStaff;
    }

    public Staff getDesignStaff() {
        return designStaff;
    }

    public void setDesignStaff(Staff designStaff) {
        this.designStaff = designStaff;
    }

    public Staff getConstructionStaff() {
        return constructionStaff;
    }

    public void setConstructionStaff(Staff constructionStaff) {
        this.constructionStaff = constructionStaff;
    }

    public LocalDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
