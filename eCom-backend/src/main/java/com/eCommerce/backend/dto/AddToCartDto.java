package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class AddToCartDto {

    private Long productId;
    private Long color;
    private Long size;
    private int quantity;
}