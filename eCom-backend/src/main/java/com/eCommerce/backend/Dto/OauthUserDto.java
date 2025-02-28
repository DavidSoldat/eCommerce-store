package com.eCommerce.backend.Dto;

import com.eCommerce.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OauthUserDto {
    private Long id;
    private String username;
    private String email;
    private Role role;
}
