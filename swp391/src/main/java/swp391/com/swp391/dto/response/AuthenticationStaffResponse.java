package swp391.com.swp391.dto.response;

public class AuthenticationStaffResponse {
    private String token;
    private boolean authenticated;

    public AuthenticationStaffResponse() {
    }

    public AuthenticationStaffResponse(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public AuthenticationStaffResponse(String token, boolean authenticated) {
        this.token = token;
        this.authenticated = authenticated;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}
