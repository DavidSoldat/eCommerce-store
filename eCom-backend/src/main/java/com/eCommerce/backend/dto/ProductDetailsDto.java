package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.Product.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDetailsDto {
    private Long id;
    private String productName;
    private BigDecimal productPrice;
    private String productDescription;
    private Double productRating;
    private Double productDiscount;
    private Integer productQuantity;
    private Character genderCategory;
    private LocalDateTime createdAt;
    private String brandName;
    private String categoryName;
    private List<String> colors;
    private List<String> sizes;
    private List<String> images;

    public ProductDetailsDto(Product product) {
        this.id = product.getId();
        this.productName = product.getProductName();
        this.productPrice = product.getProductPrice();
        this.productDescription = product.getProductDescription();
        this.productRating = product.getProductRating();
        this.productDiscount = product.getProductDiscount();
        this.productQuantity = product.getProductQuantity();
        this.genderCategory = product.getGenderCategory();
        this.createdAt = product.getCreatedAt();

        this.brandName = product.getBrand() != null ? product.getBrand().getName() : null;

        this.categoryName = product.getCategory() != null ? product.getCategory().getName() : null;

        this.colors = product.getProductColors().stream()
                .map(Color::getName)
                .collect(Collectors.toList());

        this.sizes = product.getProductSizes().stream()
                .map(Size::getName)
                .collect(Collectors.toList());

        this.images = product.getProductImages();
    }
}
