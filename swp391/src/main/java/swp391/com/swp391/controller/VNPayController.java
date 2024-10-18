package swp391.com.swp391.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.TransactionVNPayRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.service.TransactionService;
import swp391.com.swp391.service.VNPayService;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {

    @Autowired
    private VNPayService vnpPayService;

    @Autowired
    TransactionService transactionService;

    @PostMapping("/test-payment")
    public ApiResponse<String> createPayment(@RequestBody TransactionVNPayRequest request) throws Exception {
        return new ApiResponse<String>(6666, "Link thanh toan", vnpPayService.createURL(request));
    }

    @GetMapping("/vnpay/callback")
    public ApiResponse<String> handlePaymentCallback(@RequestParam Map<String, String> params, HttpServletResponse response) throws Exception {
        String secretKey = "EHFO9MXOQYSJ2QV73STA5SY55QP123LU";  // Secret Key của bạn

        // Lấy chữ ký từ VNPay
        String vnpSecureHash = params.get("vnp_SecureHash");
        params.remove("vnp_SecureHash");  // Bỏ chữ ký khỏi params để tính toán lại

        // Tạo lại chuỗi dữ liệu cần ký
        String signData = createSignData(params);
        String generatedSecureHash = generateHMAC(secretKey, signData);

        if (generatedSecureHash.equals(vnpSecureHash)) {
            // Chữ ký hợp lệ, kiểm tra mã phản hồi
            if ("00".equals(params.get("vnp_ResponseCode"))) {
                // Giao dịch thành công
                // Lưu thông tin giao dịch vào cơ sở dữ liệu (transactionRepository.save(...))
                transactionService.updateTransactionVNPayById
                        (Integer.parseInt(params.get("vnp_OrderInfo")), params.get("vnp_TransactionNo"));
                // Redirect tới trang thành công
//                String successUrl = buildSuccessUrl(params);
//                response.sendRedirect(successUrl);
                return new ApiResponse<String>
                        (7777, "Transaction successfully!","Transaction successfully!");
            } else {
                // Giao dịch thất bại, redirect tới trang lỗi
//                response.sendRedirect("https://www.youtube.com/");
                return new ApiResponse<String>(1999, "Transaction fail!","Transaction fail!");
            }
        } else {
            // Chữ ký không hợp lệ
            return new ApiResponse<String>(1998, "Signed key invalid!","Signed key invalid!");
//            response.sendRedirect("https://giaoduc.net.vn/");
        }
    }

    private String createSignData(Map<String, String> params) {
        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1);  // Xóa "&" cuối cùng
        return signDataBuilder.toString();
    }

    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 =  Mac.getInstance( "HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes (StandardCharsets.UTF_8), "HmacSHA512"); hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));
        StringBuilder result = new StringBuilder();
        for (byte b: hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    private String buildSuccessUrl(Map<String, String> params) {
        StringBuilder urlBuilder = new StringBuilder("https://www.hoyolab.com/home?");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1);  // Xóa "&" cuối cùng
        return urlBuilder.toString();
    }
}

