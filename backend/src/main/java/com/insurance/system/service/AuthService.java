package com.insurance.system.service;

import com.insurance.system.dto.AuthResponse;
import com.insurance.system.dto.LoginRequest;
import com.insurance.system.dto.RegisterRequest;
import com.insurance.system.entity.Agent;
import com.insurance.system.entity.Client;
import com.insurance.system.entity.User;
import com.insurance.system.entity.enums.Role;
import com.insurance.system.repository.AgentRepository;
import com.insurance.system.repository.ClientRepository;
import com.insurance.system.repository.UserRepository;
import com.insurance.system.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);

        // Create specific role entity
        if (request.getRole() == Role.CLIENT) {
            Client client = Client.builder()
                    .user(savedUser)
                    .address(request.getAddress())
                    .drivingLicenseNumber(request.getDrivingLicenseNumber())
                    .build();
            clientRepository.save(client);
        } else if (request.getRole() == Role.AGENT) {
            Agent agent = Agent.builder()
                    .user(savedUser)
                    .agencyName(request.getAgencyName())
                    .commissionRate(0.0) // Default commission
                    .build();
            agentRepository.save(agent);
        }

        // Auto login after register? Or just return success. 
        // Let's generate token to return immediately
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        String jwt = jwtUtils.generateToken(authentication);

        return AuthResponse.builder()
                .token(jwt)
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .role(savedUser.getRole())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(authentication);

        User user = (User) authentication.getPrincipal();

        return AuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }
}
