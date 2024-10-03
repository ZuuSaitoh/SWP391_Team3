package swp391.com.swp391.dto.response;

public class IntrospectResponse {
    private boolean valid;

    public IntrospectResponse(boolean valid) {
        this.valid = valid;
    }

    public IntrospectResponse() {
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
