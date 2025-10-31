package com.moonlight.moonlightbackend.controller;

import com.moonlight.moonlightbackend.model.MenuItem;
import com.moonlight.moonlightbackend.repository.MenuItemRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:8080")
public class MenuController {

    private final MenuItemRepository menuItemRepository;

    public MenuController(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @GetMapping
    public List<MenuItem> list() {
        return menuItemRepository.findByActiveTrueOrderByCategoryAscNameAsc();
    }
}
