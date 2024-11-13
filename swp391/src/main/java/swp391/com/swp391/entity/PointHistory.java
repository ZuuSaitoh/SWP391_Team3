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
@Table(name = "point_history")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PointHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_history_id")
    int pointHistoryId;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id", nullable = true)
    Customer customer;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id", nullable = true)
    Order order;
    @ManyToOne
    @JoinColumn(name = "booking_service_id", referencedColumnName = "booking_service_id", nullable = true)
    BookingService bookingService;
    @Column(name = "change_type")
    String changeType;
    @Column(name = "changePoint")
    int changePoint;
    @Column(name = "after_update_point")
    int afterUpdatePoint;
    @Column(name = "point_history_date")
    LocalDateTime pointHistoryDate;

    public PointHistory() {
    }

    public LocalDateTime getPointHistoryDate() {
        return pointHistoryDate;
    }

    public void setPointHistoryDate(LocalDateTime pointHistoryDate) {
        this.pointHistoryDate = pointHistoryDate;
    }

    public int getPointHistoryId() {
        return pointHistoryId;
    }

    public void setPointHistoryId(int pointHistoryId) {
        this.pointHistoryId = pointHistoryId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public BookingService getBookingService() {
        return bookingService;
    }

    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public String getChangeType() {
        return changeType;
    }

    public void setChangeType(String changeType) {
        this.changeType = changeType;
    }

    public int getChangePoint() {
        return changePoint;
    }

    public void setChangePoint(int changePoint) {
        this.changePoint = changePoint;
    }

    public int getAfterUpdatePoint() {
        return afterUpdatePoint;
    }

    public void setAfterUpdatePoint(int afterUpdatePoint) {
        this.afterUpdatePoint = afterUpdatePoint;
    }
}
