package com.eCommerce.backend.service;

import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.CartItemRepository;
import com.eCommerce.backend.repository.CartRepository;
import com.eCommerce.backend.repository.ProductRepository;
import com.eCommerce.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    public Cart getCartByUserEmail(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        return user.getCart();
    }

    @Transactional
    public CartItem addItemToCart(String userEmail, Long productId, Long color, Long size, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero.");
        }
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        Cart cart = user.getCart();
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        Optional<CartItem> existingCartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId);

        CartItem cartItem;
        if(existingCartItem.isPresent()) {
            cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cart.getCartItems().add(cartItem);
        }
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public CartItem updateCartItemQuantity(String userEmail, long productId, int newQuantity) {
        if (newQuantity <= 0) {
            removeItemFromCart(userEmail, productId);
            return null;
        }

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart not found for user: " + userEmail);
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found in cart."));

        cartItem.setQuantity(newQuantity);
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public void removeItemFromCart(String userEmail, long productId) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart not found for user: " + userEmail);
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found in cart."));

        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
    }

    @Transactional
    public void clearCart(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart not found for user: " + userEmail);
        }

        cartItemRepository.deleteAll(cart.getCartItems());
        cart.getCartItems().clear();
    }

    @Transactional
    public Cart getLoggedInUserCart(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart not found for user.");
        }

        return cart;
    }

}
