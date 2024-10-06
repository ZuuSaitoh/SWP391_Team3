package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.ServiceCreationRequest;
import swp391.com.swp391.mapper.ServiceMapper;
import swp391.com.swp391.repository.ServiceRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ServiceService {
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    ServiceMapper serviceMapper;

    public swp391.com.swp391.entity.Service createService(ServiceCreationRequest request){
        swp391.com.swp391.entity.Service service = new swp391.com.swp391.entity.Service();
        service.setService_name(request.getService_name());
        service.setPrice(request.getPrice());
        service.setDescription(request.getDescription());
        service.getService_type(request.getService_type());
        return (swp391.com.swp391.entity.Service) serviceRepository.save(service);
    }
}
