package swp391.com.swp391.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import swp391.com.swp391.dto.response.ApiResponse;
import swp391.com.swp391.entity.PointHistory;
import swp391.com.swp391.service.PointHistoryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pointHistory")
public class PointHistoryController {
    @Autowired
    PointHistoryService pointHistoryService;

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll")
    ApiResponse<List<PointHistory>> fetchAll(){
        return new ApiResponse<List<PointHistory>>(9999, "List of point history", pointHistoryService.fetchAll());
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/fetchAll/{id}")
    ApiResponse<Optional<List<PointHistory>>> fetchAllByCustomerId(@PathVariable int id){
        return new ApiResponse<Optional<List<PointHistory>>>(9999, "List of point history", pointHistoryService.fetchAllByCustomerId(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/{id}")
    ApiResponse<PointHistory> getById(@PathVariable int id){
        return new ApiResponse<>(9999, "History", pointHistoryService.getById(id));
    }
}
