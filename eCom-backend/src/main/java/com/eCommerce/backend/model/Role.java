package com.eCommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "role_sequence", allocationSize = 1, sequenceName = "role_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "role_sequence")
    private Long id;
    private String name;
}
