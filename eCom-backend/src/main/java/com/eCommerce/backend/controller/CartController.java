package com.eCommerce.backend.controller;

import com.eCommerce.backend.dto.AddToCartDto;
import com.eCommerce.backend.dto.RemoveFromCartDto;
import com.eCommerce.backend.dto.UpdateCartItemDto;
import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.exception.UnauthorizedException;
import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.CartItem;
import com.eCommerce.backend.security.JwtTokenGenerator;
import com.eCommerce.backend.service.CartService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
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
            @RequestBody AddToCartDto data, HttpServletRequest request) {
        try {
            String userEmail = getUserEmailFromToken(token);
            CartItem cartItem = cartService.addItemToCart(userEmail, data);
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
            CartItem updatedCartItem = cartService.updateCartItemQuantity(
                    userEmail,
                    updateCartItemDto.getProductId(),
                    updateCartItemDto.getSizeId(),
                    updateCartItemDto.getColorId(),
                    updateCartItemDto.getQuantity()
            );
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

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeProductFromCartByBody(
            @CookieValue(name = "token", required = false) String token,
            @RequestBody RemoveFromCartDto removeDto) {
        try {
            log.info("remove data:", removeDto.toString());
            String userEmail = getUserEmailFromToken(token);
            cartService.removeItemFromCart(userEmail, removeDto.getProductId(), removeDto.getSizeId(), removeDto.getColorId());
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

    @GetMapping("/view")
    public ResponseEntity<?> getCart(@CookieValue(name = "token", required = false) String token) {
        try {
            String userEmail = getUserEmailFromToken(token);
            Cart cart = cartService.getLoggedInUserCart(userEmail);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (UnauthorizedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An internal server error occurred while retrieving the cart.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}