package com.insurance.system.dto;

import com.insurance.system.entity.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private Long id;
    private String email;
    private Role role;
    private String firstName;
    private String lastName;
}
