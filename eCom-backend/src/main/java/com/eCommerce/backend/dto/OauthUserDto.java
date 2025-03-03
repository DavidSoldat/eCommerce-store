package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OauthUserDto {
    private Long id;
    private String username;
    private String email;
    private Role role;
}
