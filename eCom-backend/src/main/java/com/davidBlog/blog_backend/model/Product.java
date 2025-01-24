package com.davidBlog.blog_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @SequenceGenerator(name = "product-sequence", sequenceName = "product-sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product-sequence")
    private Long id;
    private String title;
    private String about;
    private String[] images;
    private String[] colors;
    private char[] sizes;
    private float price;
    private float rating;
    private float discountPercentage;


}
