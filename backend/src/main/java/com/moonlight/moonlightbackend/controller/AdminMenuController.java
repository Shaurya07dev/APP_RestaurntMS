package com.moonlight.moonlightbackend.controller;

import com.moonlight.moonlightbackend.dto.MenuItemRequest;
import com.moonlight.moonlightbackend.model.MenuItem;
import com.moonlight.moonlightbackend.service.MenuItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/menu")
@CrossOrigin(origins = "http://localhost:8080")
public class AdminMenuController {

    private final MenuItemService menuItemService;

    public AdminMenuController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.getAllMenuItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemService.getMenuItemById(id));
    }

    @PostMapping
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItemRequest request) {
        MenuItem created = menuItemService.createMenuItem(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItemRequest request) {
        MenuItem updated = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<MenuItem> toggleMenuItemStatus(@PathVariable Long id) {
        MenuItem updated = menuItemService.toggleMenuItemStatus(id);
        return ResponseEntity.ok(updated);
    }
}
