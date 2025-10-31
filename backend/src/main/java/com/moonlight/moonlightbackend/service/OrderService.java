package com.moonlight.moonlightbackend.service;

import com.moonlight.moonlightbackend.dto.CreateOrderRequest;
import com.moonlight.moonlightbackend.dto.CreateOrderRequestItem;
import com.moonlight.moonlightbackend.model.MenuItem;
import com.moonlight.moonlightbackend.model.Order;
import com.moonlight.moonlightbackend.model.OrderItem;
import com.moonlight.moonlightbackend.repository.MenuItemRepository;
import com.moonlight.moonlightbackend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;

    public OrderService(OrderRepository orderRepository, MenuItemRepository menuItemRepository) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest req) {
        if (req == null || req.getItems() == null || req.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }
        if (req.getTableNumber() == null || req.getTableNumber() < 1) {
            throw new IllegalArgumentException("Table number is required");
        }

        List<Long> ids = req.getItems().stream().map(CreateOrderRequestItem::getMenuItemId).toList();
        List<MenuItem> menuItems = menuItemRepository.findAllById(ids);
        Map<Long, MenuItem> byId = new HashMap<>();
        for (MenuItem mi : menuItems) byId.put(mi.getId(), mi);

        Order order = new Order();
        order.setTableNumber(req.getTableNumber());
        order.setEmail(req.getEmail());
        order.setPhone(req.getPhone());

        BigDecimal total = BigDecimal.ZERO;
        for (CreateOrderRequestItem it : req.getItems()) {
            MenuItem mi = byId.get(it.getMenuItemId());
            if (mi == null || Boolean.FALSE.equals(mi.getActive())) {
                throw new IllegalArgumentException("Menu item not available: " + it.getMenuItemId());
            }
            BigDecimal line = mi.getPrice().multiply(BigDecimal.valueOf(it.getQuantity()));
            total = total.add(line);

            OrderItem oi = new OrderItem();
            oi.setMenuItemId(mi.getId());
            oi.setName(mi.getName());
            oi.setUnitPrice(mi.getPrice());
            oi.setQuantity(it.getQuantity());
            order.addItem(oi);
        }
        order.setTotalAmount(total);
        order.setStatus("PENDING");

        return orderRepository.save(order);
    }

    @Transactional(readOnly = true)
    public Order getOrder(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
    }
}
