package com.eCommerce.backend.controller;

import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Cart> createCart(@PathVariable Long userId) {
        Cart cart = cartService.createCartForUser(userId);
        return new ResponseEntity<>(cart, HttpStatus.CREATED);
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long cartId, @RequestBody CartItem cartItem) {
        Cart cart = cartService.addItemToCart(cartId, cartItem);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }
}
