package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class UpdateCartItemDto {
    private Long productId;
    private int quantity;
}
