package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Cart;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CartDto {
    private long id;
    private List<CartItemDto> cartItems;

    public CartDto (Cart cart) {
        this.id = cart.getId();
        this.cartItems = cart.getCartItems().stream().map(CartItemDto::new).collect(Collectors.toList());
    }
}
