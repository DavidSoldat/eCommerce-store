package com.eCommerce.backend.repository;

import com.eCommerce.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndProductIdAndSelectedSizeIdAndSelectedColorId(
            Long cartId, Long productId, Long sizeId, Long colorId);
}
