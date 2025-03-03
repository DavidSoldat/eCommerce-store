package com.eCommerce.backend.model.Product;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "colors")
@NoArgsConstructor
public class Color {
    @Id
    @SequenceGenerator(name = "color_sequence", sequenceName = "color_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "color_sequence")
    private Long id;
    private String name;


}
