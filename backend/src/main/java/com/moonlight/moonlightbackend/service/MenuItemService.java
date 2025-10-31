package com.moonlight.moonlightbackend.service;

import com.moonlight.moonlightbackend.dto.MenuItemRequest;
import com.moonlight.moonlightbackend.model.MenuItem;
import com.moonlight.moonlightbackend.repository.MenuItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    @Transactional(readOnly = true)
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    @Transactional(readOnly = true)
    public MenuItem getMenuItemById(Long id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Menu item not found: " + id));
    }

    @Transactional
    public MenuItem createMenuItem(MenuItemRequest request) {
        MenuItem item = new MenuItem();
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setCategory(request.getCategory());
        item.setActive(request.getActive() != null ? request.getActive() : true);
        
        return menuItemRepository.save(item);
    }

    @Transactional
    public MenuItem updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem item = getMenuItemById(id);
        
        if (request.getName() != null) item.setName(request.getName());
        if (request.getDescription() != null) item.setDescription(request.getDescription());
        if (request.getPrice() != null) item.setPrice(request.getPrice());
        if (request.getCategory() != null) item.setCategory(request.getCategory());
        if (request.getActive() != null) item.setActive(request.getActive());
        
        return menuItemRepository.save(item);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
        MenuItem item = getMenuItemById(id);
        menuItemRepository.delete(item);
    }

    @Transactional
    public MenuItem toggleMenuItemStatus(Long id) {
        MenuItem item = getMenuItemById(id);
        item.setActive(!item.getActive());
        return menuItemRepository.save(item);
    }
}
