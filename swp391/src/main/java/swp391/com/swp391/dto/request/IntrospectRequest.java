package swp391.com.swp391.dto.request;

public class IntrospectRequest {
    private String token;

    public IntrospectRequest(String token) {
        this.token = token;
    }

    public IntrospectRequest() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
