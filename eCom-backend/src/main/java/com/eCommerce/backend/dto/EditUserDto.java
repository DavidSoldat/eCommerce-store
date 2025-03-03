package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class EditUserDto  {
    private Long id;
    private String username;
    private String email;
    private String role;
}
