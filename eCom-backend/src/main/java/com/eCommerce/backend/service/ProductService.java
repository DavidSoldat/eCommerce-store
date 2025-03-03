package com.eCommerce.backend.service;

import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.Product.Size;
import com.eCommerce.backend.repository.ColorRepository;
import com.eCommerce.backend.repository.ProductRepository;
import com.eCommerce.backend.repository.SizeRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository) {
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(@NotNull Product product) {
        for (Size size : product.getProductSizes()) {
            if (size.getId() == null) {
                throw new IllegalArgumentException("Size ID must not be null");
            }
            sizeRepository.findById(size.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Size not found with ID: " + size.getId()));
        }

        for (Color color : product.getProductColors()) {
            if (color.getId() == null) {
                throw new IllegalArgumentException("Color ID must not be null");
            }
            colorRepository.findById(color.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Color not found with ID: " + color.getId()));
        }

        return productRepository.save(product);
    }
}
