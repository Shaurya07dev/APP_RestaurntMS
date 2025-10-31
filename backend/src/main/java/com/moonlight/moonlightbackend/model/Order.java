package com.moonlight.moonlightbackend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "table_number", nullable = false)
    private Integer tableNumber;

    @Column(length = 255)
    private String email;

    @Column(length = 32)
    private String phone;

    @Column(name = "total_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(length = 64, nullable = false)
    private String status = "CREATED";

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = Instant.now();
        if (status == null) status = "CREATED";
        if (totalAmount == null) totalAmount = BigDecimal.ZERO;
    }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // Getters/Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getTableNumber() { return tableNumber; }
    public void setTableNumber(Integer tableNumber) { this.tableNumber = tableNumber; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
