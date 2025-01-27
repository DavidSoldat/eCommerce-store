package com.eCommerce.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence_generator")
    @SequenceGenerator(name = "product_sequence_generator", allocationSize = 1, sequenceName = "product_sequence")
    private Long id;
    private String productName;
    private Double productPrice;
    private String productDescription;
    private Double productRating;
    private Double productDiscount;
    @ElementCollection
    private List<String> productColors;
    @ElementCollection
    private List<String> productSizes;
    @ElementCollection
    private List<String> productImages;
    private Integer productQuantity;
}
