package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class UpdateCartItemDto {
    private Long productId;
    private Long sizeId;
    private Long colorId;
    private int quantity;
}
