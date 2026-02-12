package com.insurance.system.config;

import com.insurance.system.entity.User;
import com.insurance.system.entity.enums.Role;
import com.insurance.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize Admin if not exists
        if (!userRepository.existsByEmail("admin@insurance.com")) {
            User admin = User.builder()
                    .firstName("Super")
                    .lastName("Admin")
                    .email("admin@insurance.com")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("123456789")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("ADMIN User Created: admin@insurance.com / admin123");
        }
    }
}
