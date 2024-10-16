package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionCreationRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int orderId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    double deposit;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String depositDescription;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String depositMethod;
    @NotNull(message = "ENTER_ALL_FIELDS")
    int depositPersonId;
    String transactionNumber;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(@NotNull(message = "ENTER_ALL_FIELDS") int orderId) {
        this.orderId = orderId;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(@NotNull(message = "ENTER_ALL_FIELDS") double deposit) {
        this.deposit = deposit;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getDepositDescription() {
        return depositDescription;
    }

    public void setDepositDescription(@NotNull(message = "ENTER_ALL_FIELDS") String depositDescription) {
        this.depositDescription = depositDescription;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getDepositMethod() {
        return depositMethod;
    }

    public void setDepositMethod(@NotNull(message = "ENTER_ALL_FIELDS") String depositMethod) {
        this.depositMethod = depositMethod;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getDepositPersonId() {
        return depositPersonId;
    }

    public void setDepositPersonId(@NotNull(message = "ENTER_ALL_FIELDS") int depositPersonId) {
        this.depositPersonId = depositPersonId;
    }

    public String getTransactionNumber() {
        return transactionNumber;
    }

    public void setTransactionNumber(String transactionNumber) {
        this.transactionNumber = transactionNumber;
    }
}