package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.CartItem;
import lombok.Data;

@Data
public class CartItemDto {
    private long id;
    private String productName;
    private int quantity;
    private double price;

    public CartItemDto(CartItem cartItem) {
        this.id = cartItem.getId();
        this.productName = cartItem.getProduct().getProductName();
        this.quantity = cartItem.getQuantity();
        this.price = cartItem.getProduct().getProductPrice();
    }
}
