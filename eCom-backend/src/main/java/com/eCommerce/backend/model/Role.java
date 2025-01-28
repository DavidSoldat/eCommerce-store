package com.eCommerce.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "role_sequence", allocationSize = 1, sequenceName = "role_sequence")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "role_sequence")
    private long id;
    private String name;
}
