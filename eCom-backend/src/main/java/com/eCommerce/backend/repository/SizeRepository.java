package com.eCommerce.backend.repository;

import com.eCommerce.backend.model.Product.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Long> {
}
