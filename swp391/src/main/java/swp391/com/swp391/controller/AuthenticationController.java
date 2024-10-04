package swp391.com.swp391.controller;

import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.AuthenticationRequest;
import swp391.com.swp391.dto.request.IntrospectRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.dto.response.AuthenticationResponse;
import swp391.com.swp391.dto.response.IntrospectResponse;
import swp391.com.swp391.service.AuthenticationService;

import java.text.ParseException;

@RestController
@RequestMapping("/customers/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/token")//login
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        ApiResponse<AuthenticationResponse> apiResponse = new ApiResponse<>();
//        AuthenticationResponse authenticationResponse = new AuthenticationResponse(result);
        apiResponse.setResult(result);
        return apiResponse;
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspectResponse(request);
        ApiResponse<IntrospectResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(result);
        return apiResponse;
    }
}
