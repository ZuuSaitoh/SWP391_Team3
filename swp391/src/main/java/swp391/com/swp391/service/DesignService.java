package swp391.com.swp391.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.com.swp391.dto.request.DesignCreationRequest;
import swp391.com.swp391.dto.request.DesignUpdateRequest;
import swp391.com.swp391.entity.Design;
import swp391.com.swp391.entity.Staff;
import swp391.com.swp391.exception.AppException;
import swp391.com.swp391.exception.ErrorCode;
import swp391.com.swp391.repository.DesignRepository;
import swp391.com.swp391.repository.StaffRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DesignService {
    @Autowired
    DesignRepository designRepository;

    @Autowired
    StaffRepository staffRepository;

    public Design createDesign(DesignCreationRequest request){
        Design design = new Design();
        Staff staff = staffRepository.findById(String.valueOf(request.getUploadStaff()))
                .orElseThrow(() -> new AppException(ErrorCode.STAFF_NOT_EXISTED));

        design.setStaff(staff);
        design.setDesignName(request.getDesignName());
        design.setImageData(request.getImageData());
        design.setDesignDate(LocalDateTime.now());
        design.setDesignVersion(request.getDesignVersion());
        return designRepository.save(design);
    }

    public List<Design> getAllDesign() {return designRepository.findAll(); }

    public Design getDesignById(int id){
        return designRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.DESIGN_NOT_EXISTED));
    }

    public void deleteDesignById(int id){ designRepository.deleteById(id); }

    public Design updateDesignByDesignId(int id, DesignUpdateRequest request){
        Design design = designRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.DESIGN_NOT_EXISTED));
        design.setDesignName(request.getDesignName());
        design.setImageData(request.getImageData());
        design.setDesignVersion(request.getDesignVersion());
        return designRepository.save(design);
    }
}
