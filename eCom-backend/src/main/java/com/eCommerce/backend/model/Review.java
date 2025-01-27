package com.eCommerce.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "reviews")
public class Review {
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Id
    private long id;
    private String reviewAuthor;
    private String reviewText;
    private double reviewRating;
    @ManyToOne()
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
