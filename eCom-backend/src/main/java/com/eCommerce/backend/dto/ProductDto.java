package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.Product.Size;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ProductDto {
    private Long id;
    private String productName;
    private Double productPrice;
    private String productCategory;
    private String productDescription;
    private Double productRating;
    private Double productDiscount;
    private Integer productQuantity;
    private Character genderCategory;
    private Set<String> productSizes;
    private Set<String> productColors;
    private List<String> productImages;

    public ProductDto(Product product) {
        this.id = product.getId();
        this.productName = product.getProductName();
        this.productPrice = product.getProductPrice();
        this.productCategory = product.getProductCategory();
        this.productDescription = product.getProductDescription();
        this.productRating = product.getProductRating();
        this.productDiscount = product.getProductDiscount();
        this.productQuantity = product.getProductQuantity();
        this.genderCategory = product.getGenderCategory();
        this.productSizes = product.getProductSizes()
                .stream()
                .map(Size::getName)
                .collect(Collectors.toSet());
        this.productColors = product.getProductColors()
                .stream()
                .map(Color::getName)
                .collect(Collectors.toSet());
        this.productImages = product.getProductImages();
    }
}

