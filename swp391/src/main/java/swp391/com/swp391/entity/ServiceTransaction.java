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
@Table(name = "[service_transaction]")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_transaction_id")
    int transactionId;
    @ManyToOne
    @JoinColumn(name = "booking_service_id", referencedColumnName = "booking_service_id", nullable = false)
    BookingService bookingService;
    @Column(name = "deposit_method")
    String depositMethod;
    @Column(name = "deposit_date")
    LocalDateTime depositDate;
    @ManyToOne
    @JoinColumn(name = "deposit_person", referencedColumnName = "customer_id", nullable = false)
    Customer depositPerson;
    @Column(name = "transaction_number")
    String transactionNumber;

    public ServiceTransaction() {
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public BookingService getBookingService() {
        return bookingService;
    }

    public void setBookingService(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    public String getDepositMethod() {
        return depositMethod;
    }

    public void setDepositMethod(String depositMethod) {
        this.depositMethod = depositMethod;
    }

    public LocalDateTime getDepositDate() {
        return depositDate;
    }

    public void setDepositDate(LocalDateTime depositDate) {
        this.depositDate = depositDate;
    }

    public Customer getDepositPerson() {
        return depositPerson;
    }

    public void setDepositPerson(Customer depositPerson) {
        this.depositPerson = depositPerson;
    }

    public String getTransactionNumber() {
        return transactionNumber;
    }

    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }
}
