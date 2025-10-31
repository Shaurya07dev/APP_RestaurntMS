package com.moonlight.moonlightbackend.controller;

import com.moonlight.moonlightbackend.dto.AdminLoginRequest;
import com.moonlight.moonlightbackend.dto.AdminLoginResponse;
import com.moonlight.moonlightbackend.model.Admin;
import com.moonlight.moonlightbackend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:8080")
public class AdminAuthController {

    private final AdminService adminService;

    public AdminAuthController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {
        Optional<Admin> admin = adminService.authenticate(request.getUsername(), request.getPassword());
        
        if (admin.isPresent()) {
            String token = adminService.generateToken(admin.get());
            AdminLoginResponse response = new AdminLoginResponse(
                token,
                admin.get().getUsername(),
                admin.get().getFullName(),
                admin.get().getRole()
            );
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
