package com.eCommerce.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @CollectionTable(name = "product_colors")
    private List<String> productColors;
    @CollectionTable(name = "product_sizes")
    @ElementCollection
    private List<String> productSizes;
    @CollectionTable(name = "product_images")
    @ElementCollection
    private List<String> productImages;
    private Integer productQuantity;
    @OneToMany(mappedBy = "product")
    private Set<Review> reviews = new HashSet<>();
}
