package com.eCommerce.backend.repository;

import com.eCommerce.backend.model.Product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {
}
