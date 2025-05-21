package com.eCommerce.backend.controller;

import com.eCommerce.backend.dto.AddToCartDto;
import com.eCommerce.backend.dto.UpdateCartItemDto;
import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.exception.UnauthorizedException;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.security.JwtTokenGenerator;
import com.eCommerce.backend.service.CartService;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;
    private final JwtTokenGenerator tokenGenerator;

    public CartController(CartService cartService, JwtTokenGenerator tokenGenerator) {
        this.cartService = cartService;
        this.tokenGenerator = tokenGenerator;
    }

    private String getUserEmailFromToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new UnauthorizedException("Authentication token is missing.");
        }
        if (!tokenGenerator.validateToken(token)) {
            throw new UnauthorizedException("Invalid authentication token.");
        }
        Claims claims = tokenGenerator.getClaimsFromToken(token);
        return claims.getSubject();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProductToCart(
            @CookieValue(name = "token", required = false) String token,
            @RequestBody AddToCartDto addToCartDto) {
        try {
            String userEmail = getUserEmailFromToken(token);
            CartItem cartItem = cartService.addItemToCart(userEmail, addToCartDto.getProductId(), addToCartDto.getColor(), addToCartDto.getSize(), addToCartDto.getQuantity());
            return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An internal server error occurred while adding product to cart.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCartItemQuantity(
            @CookieValue(name = "token", required = false) String token,
            @RequestBody UpdateCartItemDto updateCartItemDto) {
        try {
            String userEmail = getUserEmailFromToken(token);
            CartItem updatedCartItem = cartService.updateCartItemQuantity(userEmail, updateCartItemDto.getProductId(), updateCartItemDto.getQuantity());
            if (updatedCartItem == null) {
                return new ResponseEntity<>("Product removed from cart successfully due to zero quantity.", HttpStatus.OK);
            }
            return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An internal server error occurred while updating cart item quantity.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<String> removeProductFromCart(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable long productId) {
        try {
            String userEmail = getUserEmailFromToken(token);
            cartService.removeItemFromCart(userEmail, productId);
            return new ResponseEntity<>("Product removed from cart successfully!", HttpStatus.OK);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An internal server error occurred while removing product from cart.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@CookieValue(name = "token", required = false) String token) {
        try {
            String userEmail = getUserEmailFromToken(token);
            cartService.clearCart(userEmail);
            return new ResponseEntity<>("Cart cleared successfully!", HttpStatus.OK);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An internal server error occurred while clearing the cart.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
