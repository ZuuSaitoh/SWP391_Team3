package swp391.com.swp391.controller;

import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.AuthenticationStaffRequest;
import swp391.com.swp391.dto.request.IntrospectRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.dto.response.AuthenticationStaffResponse;
import swp391.com.swp391.dto.response.IntrospectResponse;
import swp391.com.swp391.service.AuthenticationStaffService;

import java.text.ParseException;

@RestController
@RequestMapping("/staff/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationStaffController {
    @Autowired
    AuthenticationStaffService authenticationStaffService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/token")//login
    ApiResponse<AuthenticationStaffResponse> authenticate(@RequestBody AuthenticationStaffRequest request){
        var result = authenticationStaffService.authenticate(request);
        ApiResponse<AuthenticationStaffResponse> apiResponse = new ApiResponse<>();
        //AuthenticationResponse authenticationResponse = new AuthenticationResponse(result);
        apiResponse.setResult(result);
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws JOSEException, ParseException {
        var result = authenticationStaffService.introspectResponse(request);
        ApiResponse<IntrospectResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(result);
        return apiResponse;
    }
}
