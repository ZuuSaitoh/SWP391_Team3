package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;

public class TransactionVNPayRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int transactionId;
    @NotNull(message = "ENTER_ALL_FIELDS")
    double deposit;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(@NotNull(message = "ENTER_ALL_FIELDS") double deposit) {
        this.deposit = deposit;
    }

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(@NotNull(message = "ENTER_ALL_FIELDS") int transactionId) {
        this.transactionId = transactionId;
    }
}
