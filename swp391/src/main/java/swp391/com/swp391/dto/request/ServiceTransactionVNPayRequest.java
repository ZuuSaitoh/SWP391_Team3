package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;

public class ServiceTransactionVNPayRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    int bookingServiceId;

    @NotNull(message = "ENTER_ALL_FIELDS")
    public int getBookingServiceId() {
        return bookingServiceId;
    }

    public void setBookingServiceId(@NotNull(message = "ENTER_ALL_FIELDS") int bookingServiceId) {
        this.bookingServiceId = bookingServiceId;
    }
}
