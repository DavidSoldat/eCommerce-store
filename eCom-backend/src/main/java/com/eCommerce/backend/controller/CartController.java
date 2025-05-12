package com.eCommerce.backend.controller;

import com.eCommerce.backend.dto.AddToCartRequest;
import com.eCommerce.backend.dto.RemoveFromCartRequest;
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


    @PostMapping("/{userId}/add")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long userId, @RequestBody AddToCartRequest request) {
        Cart cart = cartService.addItemToCart(userId, request.getProductId(), request.getQuantity());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<String> removeItemFromCart(@PathVariable Long userId, @RequestBody RemoveFromCartRequest request) {
        cartService.removeItemFromCart(userId, request.getProductId());
        return new ResponseEntity<>("Item removed from cart", HttpStatus.OK);
    }
}
