package swp391.com.swp391.dto.request;

public class AuthenticationStaffRequest {
    private String username;
    private String password;

    public AuthenticationStaffRequest(String username) {
    }

    public AuthenticationStaffRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
