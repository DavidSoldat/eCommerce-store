package com.eCommerce.backend.service;

import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.CartItemRepository;
import com.eCommerce.backend.repository.CartRepository;
import com.eCommerce.backend.repository.ProductRepository;
import com.eCommerce.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(UserRepository userRepository, CartRepository cartRepository, ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Cart addItemToCart(Long productId, Long userId, int quantity) {
       UserEntity user = userRepository.findById(userId).orElseThrow();
       Cart cart = user.getCart();
       Product product = productRepository.findById(productId).orElseThrow();

        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals((productId))).findFirst();

        if(existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);
            cartItemRepository.save(newItem);
        }
        return cart;
    }

    public void removeItemFromCart(Long userId, Long productId) {
        UserEntity user = userRepository.findById(userId).orElseThrow();
        Cart cart = user.getCart();

        CartItem itemToRemove = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst().
                orElseThrow(() -> new RuntimeException("Product not found in cart"));

        cart.getCartItems().remove(itemToRemove);
        cartItemRepository.delete(itemToRemove);
    }
}
