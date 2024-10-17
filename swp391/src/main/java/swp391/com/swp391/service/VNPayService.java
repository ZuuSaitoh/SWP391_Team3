package swp391.com.swp391.service;

import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.TransactionVNPayRequest;
import swp391.com.swp391.entity.Transaction;
import swp391.com.swp391.repository.OrderRepository;
import swp391.com.swp391.repository.TransactionRepository;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class VNPayService {

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    TransactionRepository transactionRepository;

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


    public String createURL(TransactionVNPayRequest request) throws Exception{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        float money = (float) (request.getDeposit() *100);
        String amount = String.valueOf((int)money);


        String tmnCode = "B4EZDSFD";
        String secretKey = "EHFO9MXOQYSJ2QV73STA5SY55QP123LU";
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "https://www.hoyolab.com/";//"https://www.hoyolab.com/"
//        String returnUrl = "https://www.behance.net/search/projects?orderID=" + request.getOrderId();
        String currCode = "VND";

        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", tmnCode);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_CurrCode", currCode);
        vnp_Params.put("vnp_TxnRef", getRandomNumber());
        vnp_Params.put("vnp_OrderInfo",
                "Thanh toan cho don hang co order id la "
                        + request.getOrderId() +
                        " voi noi dung don hang la " + request.getDepositDescription());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Amount", amount);

        vnp_Params.put("vnp_ReturnUrl",returnUrl);
        vnp_Params.put("vnp_CreateDate", formattedCreateDate);
        vnp_Params.put("vnp_IpAddr", "14.225.204.58");
        StringBuilder signDataBuilder = new StringBuilder();
        for (Map. Entry<String, String> entry: vnp_Params.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1);
        String signData = signDataBuilder.toString();
        String signed = generateHMAC(secretKey, signData);
        vnp_Params.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder (vnpUrl);
        urlBuilder.append("?");
        for (Map. Entry<String, String> entry: vnp_Params.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length()-1);
        return urlBuilder.toString();
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
}
