package com.insurance.system.service;

import com.insurance.system.dto.UserDTO;
import com.insurance.system.entity.User;
import com.insurance.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserDTO getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal(); // Assuming custom UserDetails matches specific user class or handled via lookup
        // Ideally reload from DB
        return mapToDTO(userRepository.findById(user.getId()).orElseThrow());
    }

    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        // Assume email/role/password handled separately or not allowed to update here
        return mapToDTO(userRepository.save(user));
    }

    // Helper to get current authenticated user ID
    public Long getCurrentUserId() {
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         if (auth != null && auth.getPrincipal() instanceof User) {
             return ((User) auth.getPrincipal()).getId();
         }
         // Fallback if principal is string (e.g. username)
         String email = auth.getName();
         return userRepository.findByEmail(email).map(User::getId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        return dto;
    }
}
