package com.eCommerce.backend.model.Product;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "sizes")
@NoArgsConstructor
public class Size {
    @Id
    @SequenceGenerator(name = "size_sequence", sequenceName = "size_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "size_sequence")
    private Long id;
    private String size;

}
