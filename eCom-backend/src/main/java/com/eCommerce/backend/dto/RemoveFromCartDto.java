package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class RemoveFromCartDto {
    private Long productId;
    private Long sizeId;
    private Long colorId;
}