package swp391.com.swp391.exception;

import jakarta.validation.constraints.NotBlank;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error"),
    INVALID_KEY(1001, "Uncategorized error"),
    USER_EXISTED(1002, "User existed"),
    USERNAME_INVALID(1003, "Username must be at least 3 characters"),
    INVALID_PASSWORD(1004, "Password must be at least 8 characters"),
    USER_NOT_EXISTED(1005, "User not existed"),
    UNAUTHENTICATED(1006, "Unauthenticated"),
    INVALID_EMAIL(1007, "Invalid email"),
    EMAIL_EXISTED(1008, "Email existed"),
    ENTER_ALL_FIELDS(1009, "There is a blank field! You should enter all field"),
    PASSWORD_NOT_MATCH(1010, "Password didn't match! Try again!"),
    PHONE_NUMBER_INVALID(1011, "Phone number invalid, please try again"),
    USER_DELETED(1012, "User deleted"),
    EMAIL_NOT_EXISTED(1013, "Email don't existed!"),
    LOGIN_GG_NOT_PASSWORD(1014, "Can't change the password because you've login by GG method!"),
    INVALID_SERVICE_TYPE(1015, "Service must be Cleaning Pond Service or Maintenance!"),
    SERVICE_NOT_EXISTED(1015, "Service does not existed!"),
    INVALID_STAFF_TYPE(1016,"Staff does not existed!"),
    STAFF_NOT_EXISTED(1017, "Staff not existed"),
    ORDER_NOT_EXISTED(1018, "Order not existed"),
    RATING_MIN(1019, "Rating at least 1"),
    RATING_MAX(1020, "Rating at most 5"),
    SHORT_FEEDBACK(1021, "Feedback at least 5 characters!"),
    CONTRACT_NOT_EXISTED(1022, "Contract is not existed!")
    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
