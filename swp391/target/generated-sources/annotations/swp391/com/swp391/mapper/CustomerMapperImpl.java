package swp391.com.swp391.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import swp391.com.swp391.dto.request.CustomerCreationRequest;
import swp391.com.swp391.dto.response.CustomerResponse;
import swp391.com.swp391.entity.Customer;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer toCustomer(CustomerCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        Customer customer = new Customer();

        customer.setUsername( request.getUsername() );
        customer.setPassword( request.getPassword() );
        customer.setMail( request.getMail() );

        return customer;
    }

    @Override
    public CustomerResponse toCustomerResponse(Customer customer) {
        if ( customer == null ) {
            return null;
        }

        CustomerResponse customerResponse = new CustomerResponse();

        return customerResponse;
    }
}
