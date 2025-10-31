package com.moonlight.moonlightbackend.controller;

import com.moonlight.moonlightbackend.dto.CreateOrderRequest;
import com.moonlight.moonlightbackend.model.Order;
import com.moonlight.moonlightbackend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:8080")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> create(@Valid @RequestBody CreateOrderRequest request) {
        Order saved = orderService.createOrder(request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> get(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }
}
