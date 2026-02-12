package com.insurance.system.dto;

import com.insurance.system.entity.enums.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
}
