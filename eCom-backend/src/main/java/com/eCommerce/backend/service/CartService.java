package com.eCommerce.backend.service;

import com.eCommerce.backend.dto.AddToCartDto;
import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.Product.Size;
import com.eCommerce.backend.model.UserEntity;
import com.eCommerce.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final SizeRepository sizeRepository;
    private final ColorRepository colorRepository;

    public CartService(UserRepository userRepository, CartRepository cartRepository,
                       ProductRepository productRepository, CartItemRepository cartItemRepository,
                       SizeRepository sizeRepository, ColorRepository colorRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.sizeRepository = sizeRepository;
        this.colorRepository = colorRepository;
    }

    public Cart getCartByUserEmail(String userEmail) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        return user.getCart();
    }

    @Transactional
    public CartItem addItemToCart(String userEmail, AddToCartDto data) {
        if (data.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero.");
        }
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        Cart cart = user.getCart();
        Product product = productRepository.findById(data.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + data.getId()));

        Size selectedSize = sizeRepository.findById(data.getSize())
                .orElseThrow(() -> new ResourceNotFoundException("Size not found with ID: " + data.getSize()));

        Color selectedColor = colorRepository.findById(data.getColor())
                .orElseThrow(() -> new ResourceNotFoundException("Color not found with ID: " + data.getColor()));


        if (!product.getProductSizes().contains(selectedSize)) {
            throw new IllegalArgumentException("Selected size is not available for this product.");
        }
        if (!product.getProductColors().contains(selectedColor)) {
            throw new IllegalArgumentException("Selected color is not available for this product.");
        }


        Optional<CartItem> existingCartItem = cartItemRepository
                .findByCartIdAndProductIdAndSelectedSizeIdAndSelectedColorId(
                        cart.getId(), data.getId(), data.getSize(), data.getColor());

        CartItem cartItem;
        if(existingCartItem.isPresent()) {
            cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + data.getQuantity());
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(data.getQuantity());
            cartItem.setSelectedSize(selectedSize);
            cartItem.setSelectedColor(selectedColor);
            cart.getCartItems().add(cartItem);
        }
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public CartItem updateCartItemQuantity(String userEmail, long productId, Long sizeId, Long colorId, int newQuantity) {
        if (newQuantity <= 0) {
            removeItemFromCart(userEmail, productId, sizeId, colorId);
            return null;
        }

        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart not found for user: " + userEmail);
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndProductIdAndSelectedSizeIdAndSelectedColorId(
                        cart.getId(), productId, sizeId, colorId)
                .orElseThrow(() -> new ResourceNotFoundException("Product with specified size and color not found in cart."));

        cartItem.setQuantity(newQuantity);
        return cartItemRepository.save(cartItem);
    }

    @Transactional
    public void removeItemFromCart(String userEmail, long productId, Long sizeId, Long colorId) {
        UserEntity user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        Cart cart = user.getCart();
        if (cart == null) {
            throw new ResourceNotFoundException("Cart not found for user: " + userEmail);
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndProductIdAndSelectedSizeIdAndSelectedColorId(
                        cart.getId(), productId, sizeId, colorId)
                .orElseThrow(() -> new ResourceNotFoundException("Product with specified size and color not found in cart."));

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