package com.eCommerce.backend.dto;

import lombok.Data;

@Data
public class ProductDto {
    private String productName;
    private Double productPrice;
    private String productDescription;
    private Double productRating;
    private Double productDiscount;
    private String[] productColors;
    private String[] productSizes;
    private String[] productImages;
    private Integer productQuantity;
}
