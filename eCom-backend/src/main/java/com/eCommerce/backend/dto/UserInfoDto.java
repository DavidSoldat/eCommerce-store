package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Cart;
import com.eCommerce.backend.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private CartDto cart;


        public UserInfoDto(UserEntity user) {
            this.id = user.getId();
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.role = user.getRole().getName();

            if (user.getCart() != null) {
                this.cart = new CartDto(user.getCart());
            } else {
                this.cart = null;
            }
        }
    }


