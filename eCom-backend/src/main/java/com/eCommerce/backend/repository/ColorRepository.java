package com.eCommerce.backend.repository;

import com.eCommerce.backend.model.Product.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Long> {
}
