package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class AddToCartDto {
    private Long id;
    private Long color;
    private Long size;
    private int quantity;
}