package com.insurance.system.controller;

import com.insurance.system.dto.CarDTO;
import com.insurance.system.service.CarService;
import com.insurance.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:4200")
public class CarController {

    @Autowired
    private CarService carService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private com.insurance.system.service.FileStorageService fileStorageService;

    @GetMapping
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    @PostMapping(consumes = { org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<CarDTO> createCar(
            @RequestPart("car") String carDTOString,
            @RequestPart(value = "image", required = false) org.springframework.web.multipart.MultipartFile image) throws Exception {
        
        CarDTO carDTO = new com.fasterxml.jackson.databind.ObjectMapper().readValue(carDTOString, CarDTO.class);
        
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            carDTO.setImageUrl(imageUrl);
        }
        
        // If created via generic API, assume client ID is passed or handle generically
        // If normal user calls this, we might need to verify permission. 
        // For admin usage mainly.
        return ResponseEntity.ok(carService.createCar(carDTO, carDTO.getClientId())); // Assuming DTO has client ID
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDTO> updateCar(@PathVariable Long id, @RequestBody CarDTO carDTO) {
        return ResponseEntity.ok(carService.updateCar(id, carDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }
}
