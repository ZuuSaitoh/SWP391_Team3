package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Hàm để sinh OTP ngẫu nhiên
    public String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);  // OTP có 6 chữ số
        return String.valueOf(otp);
    }

    // Hàm gửi email OTP
    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("phat21052004@gmail.com");  // Địa chỉ email của bạn
        message.setTo(toEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);
        mailSender.send(message);
    }
}

