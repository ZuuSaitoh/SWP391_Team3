package swp391.com.swp391.service;

import org.apache.http.client.utils.URIBuilder;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPayService {

    // Gán cấu hình trực tiếp trong code
    private String vnpTmnCode = "B4EZDSFD";
    private String vnpHashSecret = "EHFO9MXOQYSJ2QV73STA5SY55QP123LU";
    private String vnpPayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private String returnUrl = "http://yourapp.com/vnpay-return";

    public String createPaymentUrl(BigDecimal amount, String orderInfo, String ipAddress) throws Exception {
        String vnpVersion = "2.1.0";
        String vnpCommand = "pay";
        String vnpOrderType = "billpayment";
        String vnpCurrCode = "VND";

        Map<String, String> vnpParams = new HashMap<>();
        vnpParams.put("vnp_Version", vnpVersion);
        vnpParams.put("vnp_Command", vnpCommand);
        vnpParams.put("vnp_TmnCode", vnpTmnCode);
        vnpParams.put("vnp_Amount", String.valueOf(amount.multiply(BigDecimal.valueOf(100)))); // Số tiền tính theo đơn vị VND
        vnpParams.put("vnp_CurrCode", vnpCurrCode);
        vnpParams.put("vnp_TxnRef", getRandomNumber());
        vnpParams.put("vnp_OrderInfo", orderInfo);
        vnpParams.put("vnp_OrderType", vnpOrderType);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_IpAddr", ipAddress);
        vnpParams.put("vnp_CreateDate", getCurrentTime());

        // Sắp xếp các tham số để tạo mã băm
        List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder queryString = new StringBuilder();

        for (String fieldName : fieldNames) {
            String fieldValue = vnpParams.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                queryString.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()))
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                hashData.append(fieldName)
                        .append('=')
                        .append(fieldValue);

                if (!fieldName.equals(fieldNames.get(fieldNames.size() - 1))) {
                    queryString.append('&');
                    hashData.append('&');
                }
            }
        }

        // Tạo mã băm bảo mật
        String vnpSecureHash = hmacSHA512(vnpHashSecret, hashData.toString());
        queryString.append("&vnp_SecureHash=").append(vnpSecureHash);

        // URL thanh toán cuối cùng
        URIBuilder uriBuilder = new URIBuilder(vnpPayUrl + "?" + queryString.toString());
        return uriBuilder.toString();
    }

    private String hmacSHA512(String key, String data) throws Exception {
        Mac sha512Hmac = Mac.getInstance("HmacSHA512");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        sha512Hmac.init(secretKey);
        byte[] hashBytes = sha512Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hashHex = new StringBuilder();
        for (byte b : hashBytes) {
            hashHex.append(String.format("%02x", b));
        }
        return hashHex.toString();
    }


    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private String getCurrentTime() {
        return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    }

    private String getRandomNumber() {
        return String.valueOf((int) ((Math.random() * 899999) + 100000));
    }
}
