package com.eCommerce.backend.service;

import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.CartRepository;
import com.eCommerce.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    public CartService(UserRepository userRepository, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }

    public Cart createCartForUser(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    public Cart addItemToCart(Long cartId, CartItem cartItem) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cartItem.setCart(cart);
        cart.getCartItems().add(cartItem);
        return cartRepository.save(cart);
    }
}
