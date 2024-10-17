package swp391.com.swp391.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.TransactionVNPayRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.service.VNPayService;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {

    @Autowired
    private VNPayService vnpPayService;

    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestParam BigDecimal amount,
                                           @RequestParam String orderInfo,
                                           HttpServletRequest request) {
        try {
            String ipAddress = request.getRemoteAddr();
            String paymentUrl = vnpPayService.createPaymentUrl(amount, orderInfo, ipAddress);
            return ResponseEntity.ok(paymentUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi tạo URL thanh toán");
        }
    }

    @GetMapping("/return")
    public ResponseEntity<String> handleReturn(@RequestParam Map<String, String> params) {
        // Xử lý phản hồi thanh toán, kiểm tra thành công và xác minh mã băm tại đây
        return ResponseEntity.ok("Thanh toán đã được xử lý.");
    }

    @PostMapping("/test-payment")
    public ApiResponse<String> createPayment(@RequestBody TransactionVNPayRequest request) throws Exception {
        return new ApiResponse<String>(6666, "Link thanh toan", vnpPayService.createURL(request));
    }
}

