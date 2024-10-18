package swp391.com.swp391.service;

import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.TransactionVNPayRequest;
import swp391.com.swp391.entity.Transaction;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
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
    @Autowired
    TransactionService transactionService;

    private String getRandomNumber() {
        return String.valueOf((int) ((Math.random() * 899999) + 100000));
    }


    public String createURL(TransactionVNPayRequest request) throws Exception{
        if (!transactionRepository.existsById(request.getTransactionId())){
            throw new AppException(ErrorCode.TRANSACTION_NOT_EXISTED);
        }
        Transaction transaction = transactionService.getTransactionByTransactionId(request.getTransactionId());
        if (transaction.getDepositMethod()!=null )
            throw new AppException(ErrorCode.TRANSACTION_DONE);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);

        float money = (float) (request.getDeposit() * 100);
        String amount = String.valueOf((int)money);


        String tmnCode = "B4EZDSFD";
        String secretKey = "EHFO9MXOQYSJ2QV73STA5SY55QP123LU";
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = "http://localhost:8080/api/vnpay/vnpay/callback";
//        String returnUrl = "https://www.hoyolab.com/";
        //"https://www.hoyolab.com/"
//        String returnUrl = "https://www.behance.net/search/projects?orderID=" + request.getOrderId();
        String currCode = "VND";

        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", tmnCode);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_CurrCode", currCode);
        vnp_Params.put("vnp_TxnRef", getRandomNumber());
        vnp_Params.put("vnp_OrderInfo", String.valueOf(request.getTransactionId()));
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
