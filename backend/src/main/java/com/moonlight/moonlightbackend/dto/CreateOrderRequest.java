package com.moonlight.moonlightbackend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class CreateOrderRequest {
    @NotNull
    @Min(1)
    private Integer tableNumber;

    private String email;
    private String phone;

    @NotEmpty
    private List<CreateOrderRequestItem> items;

    public Integer getTableNumber() { return tableNumber; }
    public void setTableNumber(Integer tableNumber) { this.tableNumber = tableNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public List<CreateOrderRequestItem> getItems() { return items; }
    public void setItems(List<CreateOrderRequestItem> items) { this.items = items; }
}
