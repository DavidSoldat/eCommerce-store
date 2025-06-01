package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Product.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ProductDto {
    private Long id;
    private String productName;
    private BigDecimal productPrice;
    private Category category;
    private String productDescription;
    private Double productRating;
    private Double productDiscount;
    private Integer productQuantity;
    private Character genderCategory;
    private Set<String> productSizes;
    private Set<String> productColors;
    private List<String> productImages;
    private Brand brand;

    public ProductDto(Product product) {
        this.id = product.getId();
        this.productName = product.getProductName();
        this.productPrice = product.getProductPrice();
        this.category = product.getCategory();
        this.productDescription = product.getProductDescription();
        this.productRating = product.getProductRating();
        this.productDiscount = product.getProductDiscount();
        this.productQuantity = product.getProductQuantity();
        this.genderCategory = product.getGenderCategory();
        this.productSizes = new HashSet<>(product.getProductSizes().stream()
                .map(Size::getName)
                .collect(Collectors.toSet()));
        this.productColors = product.getProductColors()
                .stream()
                .map(Color::getName)
                .collect(Collectors.toSet());
        this.productImages = product.getProductImages();
        this.brand = product.getBrand();
    }
}

