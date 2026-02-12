package com.insurance.system.dto;

import com.insurance.system.entity.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Role role;
    
    // Client specific
    private String address;
    private String drivingLicenseNumber;
    
    // Agent specific
    private String agencyName;
}
