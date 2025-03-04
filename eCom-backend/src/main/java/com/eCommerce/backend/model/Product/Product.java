package com.eCommerce.backend.model.Product;

import com.eCommerce.backend.model.Review;
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
        private String productCategory;
        private String productDescription;
        private Double productRating;
        private Double productDiscount;
        private Integer productQuantity;
        private Character genderCategory;

        @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        @JoinTable(
                name = "product_sizes",
                joinColumns = @JoinColumn(name = "product_id"),
                inverseJoinColumns = @JoinColumn(name = "size_id"))
        private Set<Size> productSizes = new HashSet<>();

        @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        @JoinTable(
                name = "product_colors",
                joinColumns = @JoinColumn(name = "product_id"),
                inverseJoinColumns = @JoinColumn(name = "color_id"))
        private Set<Color> productColors = new HashSet<>();

        @ElementCollection(fetch = FetchType.LAZY)
        @CollectionTable(name = "productImages", joinColumns = @JoinColumn(name = "product_id"))
        @Column(name = "image_url")
        private List<String> productImages;

        @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        private Set<Review> reviews = new HashSet<>();
    }
