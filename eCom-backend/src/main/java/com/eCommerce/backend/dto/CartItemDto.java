package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.CartItem;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemDto {
    private long id;
    private long productId;
    private String productName;
    private BigDecimal productPrice;
    private int quantity;

    public CartItemDto(CartItem cartItem) {
        this.id = cartItem.getId();
        this.productId = cartItem.getProduct().getId();
        this.productName = cartItem.getProduct().getProductName();
        this.productPrice = cartItem.getProduct().getProductPrice();
        this.quantity = cartItem.getQuantity();
    }
}
