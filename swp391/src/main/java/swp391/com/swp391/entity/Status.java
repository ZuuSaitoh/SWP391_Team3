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
    Order order;
    @Column(name = "status_description")
    String statusDescription;
    @Column(name = "status_date")
    LocalDateTime statusDate;
    @ManyToOne
    @JoinColumn(name = "staff_id", referencedColumnName = "staff_id", nullable = false)
    Staff staff;
    @Column(name = "check_date")
    LocalDateTime checkDate;
    @Column(name = "complete")
    boolean complete;
    @Column(name = "number_of_update")
    int numberOfUpdate;
    @Column(name = "reject_reason")
    String rejectReason;

    public Status() {
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
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

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

//    public byte getComplete() {
//        return complete;
//    }
//
//    public void setComplete(byte complete) {
//        this.complete = complete;
//    }

    public int getNumberOfUpdate() {
        return numberOfUpdate;
    }

    public void setNumberOfUpdate(int numberOfUpdate) {
        this.numberOfUpdate = numberOfUpdate;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }
}
