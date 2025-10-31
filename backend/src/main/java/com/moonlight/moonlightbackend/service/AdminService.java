package com.moonlight.moonlightbackend.service;

import com.moonlight.moonlightbackend.model.Admin;
import com.moonlight.moonlightbackend.repository.AdminRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Transactional(readOnly = true)
    public Optional<Admin> authenticate(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent() && admin.get().getActive()) {
            // Simple password check (in production, use BCrypt)
            if (admin.get().getPassword().equals(password)) {
                return admin;
            }
        }
        return Optional.empty();
    }

    public String generateToken(Admin admin) {
        // Simple token generation (in production, use JWT)
        String tokenData = admin.getId() + ":" + admin.getUsername() + ":" + System.currentTimeMillis();
        return Base64.getEncoder().encodeToString(tokenData.getBytes());
    }

    @Transactional
    public Admin createAdmin(String username, String password, String fullName, String email) {
        if (adminRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        Admin admin = new Admin();
        admin.setUsername(username);
        admin.setPassword(password); // In production, hash with BCrypt
        admin.setFullName(fullName);
        admin.setEmail(email);
        admin.setRole("ADMIN");
        admin.setActive(true);
        
        return adminRepository.save(admin);
    }
}
