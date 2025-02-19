package com.eCommerce.backend.model;

import com.eCommerce.backend.model.Product.Product;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "reviews")
public class Review {
    @Id
    @SequenceGenerator(name = "review_sequence", sequenceName = "review_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence")
    private long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity reviewAuthor;
    private String reviewText;
    private double reviewRating;
    @ManyToOne()
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
