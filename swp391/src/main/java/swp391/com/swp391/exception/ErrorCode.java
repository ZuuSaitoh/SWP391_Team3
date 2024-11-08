package swp391.com.swp391.exception;

import jakarta.validation.constraints.NotBlank;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(99999, "Uncategorized error"),
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
    SERVICE_NOT_EXISTED(1016, "Service does not existed!"),
    INVALID_STAFF_TYPE(1017,"Staff does not existed!"),
    STAFF_NOT_EXISTED(1018, "Staff not existed"),
    ORDER_NOT_EXISTED(1019, "Order not existed"),
    RATING_MIN(1020, "Rating at least 1"),
    RATING_MAX(1021, "Rating at most 5"),
    SHORT_FEEDBACK(1022, "Feedback at least 5 characters!"),
    CONTRACT_NOT_EXISTED(1023, "Contract is not existed!"),
    DESIGN_NOT_EXISTED(1024,"Design is not existed!"),
    STATUS_NOT_EXISTED(1025,"Status is not existed!"),
    THREE_TIME_UPDATE(1026,"You can't update more than 3 times!"),
    COMPLETE_TRUE(1027,"You can't change the status because this status has set to done!"),
    CONSULTING_STAFF_NOT_EXISTED(1028, "Consulting staff not existed!"),
    DESIGN_STAFF_NOT_EXISTED(1029, "Design staff not existed!"),
    CONSTRUCTION_STAFF_NOT_EXISTED(1030, "Construction staff not existed!"),
    ACCEPTANCE_TEST_NOT_EXISTED(1031, "Acceptance test is not existed!"),
    TRANSACTION_NOT_EXISTED(1032,"Transaction is not existed!"),
    BOOKING_SERVICE_NOT_EXISTED(1033, "Booking service is not existed!"),
    TRANSACTION_DONE(1034,"Transaction has been pay!"),
    SERVICE_TRANSACTION_DONE(1035,"Transaction has been pay!"),
    SERVICE_TRANSACTION_NOT_EXISTED(1036,"Transaction not existed!"),
    DISCOUNT_NOT_EXISTED(1037, "Discount not existed!"),
    FORM_NOT_EXISTED(1038, "Form not existed!"),
    ORDER_CREATED(1038, "Order have been created with this form!"),
    ORDER_COMPLETE(1039,"The order is done so that you can't set end date!"),
    MAX_POINT(1040,"You are using points more than the number that you have!"),
    HISTORY_NOT_EXISTED(1041,"History point id is not existed!"),
    CUSTOMER_HISTORY_NOT_EXISTED(1042,"History point of customer is not existed!")
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
