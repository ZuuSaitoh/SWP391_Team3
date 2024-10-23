package swp391.com.swp391.dto.request;

import jakarta.validation.constraints.NotNull;

public class FormUpdateRequest {
    @NotNull(message = "ENTER_ALL_FIELDS")
    String location;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String style;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String area;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String stage;
    @NotNull(message = "ENTER_ALL_FIELDS")
    String contactMethod;

    public @NotNull(message = "ENTER_ALL_FIELDS") String getLocation() {
        return location;
    }

    public void setLocation(@NotNull(message = "ENTER_ALL_FIELDS") String location) {
        this.location = location;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getStyle() {
        return style;
    }

    public void setStyle(@NotNull(message = "ENTER_ALL_FIELDS") String style) {
        this.style = style;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getArea() {
        return area;
    }

    public void setArea(@NotNull(message = "ENTER_ALL_FIELDS") String area) {
        this.area = area;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getStage() {
        return stage;
    }

    public void setStage(@NotNull(message = "ENTER_ALL_FIELDS") String stage) {
        this.stage = stage;
    }

    public @NotNull(message = "ENTER_ALL_FIELDS") String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(@NotNull(message = "ENTER_ALL_FIELDS") String contactMethod) {
        this.contactMethod = contactMethod;
    }
}
