package com.eCommerce.backend.service;

import com.eCommerce.backend.dto.ProductDetailsDto;
import com.eCommerce.backend.dto.ProductDto;
import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.model.Product.*;
import com.eCommerce.backend.repository.CategoryRepository;
import com.eCommerce.backend.repository.ColorRepository;
import com.eCommerce.backend.repository.ProductRepository;
import com.eCommerce.backend.repository.SizeRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductDetailsDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductDetailsDto::new)
                .collect(Collectors.toList());
    }

    public Product addProduct(@NotNull Product product) {

        Set<Size> sizes = product.getProductSizes().stream()
                .map(size -> sizeRepository.findById(size.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());

        Set<Color> colors = product.getProductColors().stream()
                .map(color -> colorRepository.findById(color.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());

        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        product.setProductSizes(sizes);
        product.setProductColors(colors);
        product.setCategory(category);

        log.info("Product added: {}", product.toString());
        return productRepository.save(product);
    }


    public Product getProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId ));
    }

    private ProductDetailsDto mapToProductDetailsDTO(Product product) {
        return new ProductDetailsDto(product);
    }

    public void removeProduct(Long productId) {
        productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.deleteById(productId);
    }
}
