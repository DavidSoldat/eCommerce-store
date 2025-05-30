package com.eCommerce.backend.model;

import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.Product.Size;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cart_item_sequence_generator")
    @SequenceGenerator(name = "cart_item_sequence_generator", allocationSize = 1, sequenceName = "cart_item_sequence")
    private long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size selectedSize;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private Color selectedColor;

    private int quantity;
}
