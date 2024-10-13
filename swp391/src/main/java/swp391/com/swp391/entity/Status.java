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
@Table(name = "status")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    int statusId;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id", nullable = false)
    Order orderId;
    @Column(name = "status_description")
    String statusDescription;
    @Column(name = "status_date")
    LocalDateTime statusDate;
    @ManyToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "staff_id", nullable = false)
    Staff staffId;
    @Column(name = "check_date")
    LocalDateTime checkDate;
    @Column(name = "complete")
    byte complete;
    @Column(name = "number_of_update")
    int numberOfUpdate;

    public Status() {
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public Order getOrderId() {
        return orderId;
    }

    public void setOrderId(Order orderId) {
        this.orderId = orderId;
    }

    public String getStatusDescription() {
        return statusDescription;
    }

    public void setStatusDescription(String statusDescription) {
        this.statusDescription = statusDescription;
    }

    public LocalDateTime getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(LocalDateTime statusDate) {
        this.statusDate = statusDate;
    }

    public LocalDateTime getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(LocalDateTime checkDate) {
        this.checkDate = checkDate;
    }

    public Staff getStaffId() {
        return staffId;
    }

    public void setStaffId(Staff staffId) {
        this.staffId = staffId;
    }

    public byte getComplete() {
        return complete;
    }

    public void setComplete(byte complete) {
        this.complete = complete;
    }

    public int getNumberOfUpdate() {
        return numberOfUpdate;
    }

    public void setNumberOfUpdate(int numberOfUpdate) {
        this.numberOfUpdate = numberOfUpdate;
    }
}
