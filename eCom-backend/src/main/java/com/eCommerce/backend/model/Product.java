package com.eCommerce.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
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
