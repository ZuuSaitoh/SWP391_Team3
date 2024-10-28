package swp391.com.swp391.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.CustomerRepository;
import swp391.com.swp391.service.EmailService;

@RestController
public class GmailController {
    @Autowired
    private EmailService emailService;
    @Autowired
    CustomerRepository customerRepository;

//    @GetMapping("/send-otp")
//    public String sendOtp(@RequestParam String email) {
//        // Sinh OTP ngẫu nhiên
//        String otp = emailService.generateOTP();
//
//        // Gửi OTP đến email
//        emailService.sendOtpEmail(email, otp);
//
//        return "OTP sent to " + email;
//    }

//    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//    @GetMapping("/send-otp")
//    ApiResponse<String> sendOtp(@RequestParam String email) {
//        if (!customerRepository.existsByMail(email)){
//            throw new AppException(ErrorCode.EMAIL_NOT_EXISTED);
//        }
//        // Sinh OTP ngẫu nhiên
//        String otp = emailService.generateOTP();
//
//        // Gửi OTP đến email
//        emailService.sendOtpEmail(email, otp);
//
//        return new ApiResponse<String>(1111,"OTP sent to " + email, otp);
//    }
}
