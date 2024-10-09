package swp391.com.swp391.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.ServiceCreationRequest;
import swp391.com.swp391.dto.request.ServiceUpdateRequest;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.mapper.ServiceMapper;
import swp391.com.swp391.repository.ServiceRepository;

import java.util.List;

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
        service.setServiceName(request.getService_name());
        service.setPrice(request.getPrice());
        service.setDescription(request.getDescription());
        service.setServiceType(request.getService_type());
        return (swp391.com.swp391.entity.Service) serviceRepository.save(service);
    }

    public List<swp391.com.swp391.entity.Service> getService(){
        return serviceRepository.findAll();
    }

    public swp391.com.swp391.entity.Service getServiceById(int service_id){
        return serviceRepository.findById(String.valueOf(service_id))
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_EXISTED));
    }

    public swp391.com.swp391.entity.Service updateService(int service_id, ServiceUpdateRequest request){
        swp391.com.swp391.entity.Service service = getServiceById(service_id);
        service.setServiceName(request.getService_name());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());
        service.setServiceType(request.getService_type());
        return serviceRepository.save(service);
    }

    public void delete(int service_id){
        serviceRepository.deleteById(String.valueOf(service_id));
    }


//    public Optional<List<swp391.com.swp391.entity.Service>> getServiceByService_type(String service_type){
//        return Optional.ofNullable(serviceRepository.findByService_type(service_type)
//                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_EXISTED)));
//    }
}
