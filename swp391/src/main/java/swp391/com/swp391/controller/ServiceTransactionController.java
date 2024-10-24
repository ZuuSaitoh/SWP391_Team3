package swp391.com.swp391.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.request.ServiceTransactionCreationRequest;
import swp391.com.swp391.dto.request.ServiceTransactionVNPayRequest;
import swp391.com.swp391.dto.request.TransactionVNPayRequest;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.ServiceTransaction;
import swp391.com.swp391.repository.ServiceTransactionRepository;
import swp391.com.swp391.service.ServiceTransactionService;
import swp391.com.swp391.service.VNPayService;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/serviceTransaction")
public class ServiceTransactionController {
    @Autowired
    ServiceTransactionService serviceTransactionService;

    @Autowired
    VNPayService vnPayService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/check/{id}")
    ApiResponse<Boolean> check(@PathVariable int id) {
        return new ApiResponse<Boolean>(1234, "Check transaction", serviceTransactionService.checkTransactionStatus(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/create/cash")
    ApiResponse<ServiceTransaction>
    createServiceTransactionByCash(@RequestBody @Valid ServiceTransactionCreationRequest request){
        return new ApiResponse<ServiceTransaction>
                (2222, "Transaction successfully",
                        serviceTransactionService.createTransactionByCash(request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<ServiceTransaction>> getAllTransaction(){
        return new ApiResponse<List<ServiceTransaction>>
                (9999, "List of transaction", serviceTransactionService.getAllTransaction());
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    ApiResponse<ServiceTransaction> getTransactionById(@PathVariable int id){
        return new ApiResponse<ServiceTransaction>
                (9999, "Transaction " + id , serviceTransactionService.getTransactionById(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/bookingService/{id}")
    ApiResponse<Optional<ServiceTransaction>> getTransactionByBookingServiceId(@PathVariable int id){
        return new ApiResponse<Optional<ServiceTransaction>>
                (9999, "Transaction " + id , serviceTransactionService.getTransactionByBookingServiceId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/{id}")
    ApiResponse<String> deleteTransaction(@PathVariable int id){
        serviceTransactionService.deleteTransaction(id);
        return new ApiResponse<String>(1234, "Delete transaction", "Delete successfully");
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/delete/all")
    ApiResponse<String> deleteAllTransaction(){
        serviceTransactionService.deleteAllTransaction();
        return new ApiResponse<String>(1234, "Delete transaction", "Delete successfully");
    }


    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/test-payment")
    public ApiResponse<String> createPayment(@RequestBody ServiceTransactionVNPayRequest request) throws Exception {
        return new ApiResponse<String>(6666, "Link thanh toan", vnPayService.createServiceBookingURL(request));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/vnpay/callback")
    public void handlePaymentCallback(@RequestParam Map<String, String> params, HttpServletResponse response) throws Exception {
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
                serviceTransactionService.createTransactionByVNPay
                        (Integer.parseInt(params.get("vnp_OrderInfo")), params.get("vnp_TransactionNo"));
                // Redirect tới trang thành công
                String successUrl = buildSuccessUrl(params);
                response.sendRedirect(successUrl);
            } else {
                // Giao dịch thất bại, redirect tới trang lỗi
                response.sendRedirect("http://localhost:5173/payment-failed");
            }
        } else {
            // Chữ ký không hợp lệ
            response.sendRedirect("http://localhost:5173/payment-invalid-key");
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
        StringBuilder urlBuilder = new StringBuilder("http://localhost:5173/payment-success?");
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
