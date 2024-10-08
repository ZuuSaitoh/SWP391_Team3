package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.mapper.DiscountMapper;
import swp391.com.swp391.repository.DiscountRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class DiscountService {
    @Autowired
    DiscountRepository discountRepository;
    @Autowired
    DiscountMapper discountMapper;


}
