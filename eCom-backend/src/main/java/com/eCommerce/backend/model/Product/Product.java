package com.eCommerce.backend.model.Product;

import com.eCommerce.backend.model.Review;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
        @Column(name = "product_price", precision = 10, scale = 2)
        private BigDecimal productPrice;
        private String productDescription;
        private Double productRating;
        private Double productDiscount;
        private Integer productQuantity;
        private Character genderCategory;

        @ManyToOne
        @JoinColumn(name = "category_id")
        private Category category;

        @CreationTimestamp
        @Column(updatable = false, nullable = false)
        private LocalDateTime createdAt;

        @ManyToMany
        @JoinTable(
                name = "product_sizes",
                joinColumns = @JoinColumn(name = "product_id"),
                inverseJoinColumns = @JoinColumn(name = "size_id"))
        private Set<Size> productSizes = new HashSet<>();

        @ManyToMany
        @JoinTable(
                name = "product_colors",
                joinColumns = @JoinColumn(name = "product_id"),
                inverseJoinColumns = @JoinColumn(name = "color_id"))
        private Set<Color> productColors = new HashSet<>();

        @ElementCollection
        @CollectionTable(name = "productImages", joinColumns = @JoinColumn(name = "product_id"))
        @Column(name = "image_url")
        private List<String> productImages;

        @OneToMany(mappedBy = "product")
        private Set<Review> reviews = new HashSet<>();

        @ManyToOne
        @JoinColumn(name = "brand_id")
        private Brand brand;
    }
