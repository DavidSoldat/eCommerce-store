package com.eCommerce.backend.repository;

import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.service.ProductService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
