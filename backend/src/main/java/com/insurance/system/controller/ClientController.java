package com.insurance.system.controller;

import com.insurance.system.dto.*;
import com.insurance.system.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@PreAuthorize("hasRole('CLIENT')")
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    @Autowired
    private PolicyService policyService;

    @Autowired
    private ClaimService claimService;
    
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO userDTO) {
        Long userId = userService.getCurrentUserId();
        return ResponseEntity.ok(userService.updateUser(userId, userDTO));
    }

    @PostMapping(value = "/cars", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<CarDTO> addCar(
            @RequestPart("car") String carDTOString,
            @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        
        CarDTO carDTO = new ObjectMapper().readValue(carDTOString, CarDTO.class);
        
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            carDTO.setImageUrl(imageUrl);
        }
        
        Long userId = userService.getCurrentUserId();
        return ResponseEntity.ok(carService.createCar(carDTO, userId));
    }

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getMyCars() {
        Long userId = userService.getCurrentUserId();
        return ResponseEntity.ok(carService.getCarsByClient(userId));
    }

    @GetMapping("/policies")
    public ResponseEntity<List<PolicyDTO>> getMyPolicies() {
        Long userId = userService.getCurrentUserId();
        return ResponseEntity.ok(policyService.getPoliciesByClientUser(userId));
    }
    
    @PostMapping("/claims")
    public ResponseEntity<ClaimDTO> submitClaim(@RequestBody ClaimDTO claimDTO) {
        return ResponseEntity.ok(claimService.createClaim(claimDTO));
    }

    @GetMapping("/payments")
    public ResponseEntity<List<PaymentDTO>> getMyPayments() {
        Long userId = userService.getCurrentUserId();
        return ResponseEntity.ok(paymentService.getPaymentsByClientUser(userId));
    }
}
