package swp391.com.swp391.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final String[] PUBLIC_ENDPOINTS = {"/**"};
//    private final String[] PUBLIC_ENDPOINTS = {"/customers/create",
//            "/customers/auth/token", "/customers/auth/introspect",
//            "/staff/auth/token", "/staff/auth/introspect", "/customers/checkMail/{mail}", "/customers/update/password/{mail}",
//            "/designs/fetchAll", "/discounts/fetchAll", "/discounts/{id}", "/forms/{id}",
//    };
//    // Các endpoint yêu cầu quyền Manager
//    private static final String[] ADMIN_ENDPOINTS = { "/acceptancetests/create", "/acceptancetests/fetchAll",
//            "/acceptancetests/{id}", "/acceptancetests/delete/{id}", "/acceptancetests/update/{id}",
//            "/acceptancetests/fetchAll/order/{id}", "/bookingservices/update/staff/{id}", "/bookingservices/fetchAll",
//            "/bookingservices/{id}", "/bookingservices/delete/{id}", "/bookingservices/updateStatus/{id}",
//            "/bookingservices/fetchAll/service/{id}", "/contracts/create", "/contracts/fetchAll",
//            "/contracts/{id}", "/contracts/delete/{id}", "/contracts/update/{id}", "/contracts/fetchAll/order/{id}",
//            "/customers/fetchAll", "/customer/{id}", "/customers/delete/{customer_id}", "/customers/checkMail/{mail}",
//            "/designs/{id}", "/designs/delete/{id}", "/discounts/create", "/discounts/delete/{id}", "/discounts/update/{id}",
//            "/forms/fetchAll", "/forms/delete/{id}", "/orders/create", "/orders/fetchAll", "/orders/{id}",
//            "/orders/update-end-date/{id}"
//    };
//
//    // Các endpoint yêu cầu quyền Customer
//    private static final String[] CONSULTING_ENDPOINTS = { "/orders/{id}", "orders/staff/fetchAll/{id}" };
//
//    // Các endpoint yêu cầu quyền Customer
//    private static final String[] DESIGN_ENDPOINTS = { "/designs/create", "/designs/fetchAll", "/designs/{id}",
//            "/designs/delete/{id}", "designs/update/{id}", "/orders/{id}"};
//
//    // Các endpoint yêu cầu quyền Customer
//    private static final String[] CONSTRUCTION_ENDPOINTS = { "/bookingservices/fetchAll/staff/{id}", "/bookingservices/updateStatus/{id}",
//            "/orders/{id}",
//    };
//
//    // Các endpoint yêu cầu quyền Customer
//    private static final String[] USER_ENDPOINTS = { "/acceptancetests/{id}", "/acceptancetests/fetchAll/order/{id}",
//            "/bookingservices/create", "/bookingservices/{id}", "/bookingservices/updateFeedback/{id}", "/bookingservices/fetchAll/customer/{id}"
//            , "/contracts/{id}", "/contracts/fetchAll/order/{id}", "/customers/{id}", "/customers/update/{customer_id}",
//            "/customers/update/avatar/{customer_id}", "/designs/{id}", "/forms/create", "/forms/customer/{id}",
//            "/forms/update/{id}", "/orders/{id}", "/orders/update-rating-and-feedback/{id}",
//            "orders/customer/fetchAll/{id}"
//
//
//    };

    @Value("${jwt.secret}")
    private String signerKey;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(request -> request
                .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS).permitAll()
                .requestMatchers(HttpMethod.PUT, PUBLIC_ENDPOINTS).permitAll()
                .requestMatchers(HttpMethod.DELETE, PUBLIC_ENDPOINTS).permitAll()
                .requestMatchers(HttpMethod.PATCH, PUBLIC_ENDPOINTS).permitAll()
//
//                .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.PUT, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.DELETE, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.PATCH, PUBLIC_ENDPOINTS).permitAll()
//
//                .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.PUT, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.DELETE, PUBLIC_ENDPOINTS).permitAll()
//                .requestMatchers(HttpMethod.PATCH, PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated());

        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder()))
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        return httpSecurity.build();
    }

    @Bean
    JwtDecoder jwtDecoder(){
        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }


}
