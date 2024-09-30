package swp391.com.swp391.mapper;

import org.mapstruct.Mapper;
import swp391.com.swp391.dto.request.CustomerCreationRequest;
import swp391.com.swp391.entity.Customer;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customer toCustomer(CustomerCreationRequest request);

}
