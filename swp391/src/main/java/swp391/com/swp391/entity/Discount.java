package swp391.com.swp391.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@Entity
@Table(name = "discount")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id")
    private int discountId;
    @Column(name = "discount_author_id")
    private int discountAuthorId;
    @Column(name = "discount_name")
    private String discountName;
    @Column(name = "discount_percent")
    private float discountPercent;
    @Column(name = "status")
    private boolean status;

    public Discount() {
    }

    public int getDiscountId() {
        return discountId;
    }

    public void setDiscountId(int discountId) {
        this.discountId = discountId;
    }

    public int getDiscountAuthorId() {
        return discountAuthorId;
    }

    public void setDiscountAuthorId(int discountAuthorId) {
        this.discountAuthorId = discountAuthorId;
    }

    public String getDiscountName() {
        return discountName;
    }

    public void setDiscountName(String discountName) {
        this.discountName = discountName;
    }

    public float getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(float discountPercent) {
        this.discountPercent = discountPercent;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
