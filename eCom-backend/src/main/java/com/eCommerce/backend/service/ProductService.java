package com.eCommerce.backend.service;

import com.eCommerce.backend.dto.ProductDto;
import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.model.Product.Size;
import com.eCommerce.backend.repository.ColorRepository;
import com.eCommerce.backend.repository.ProductRepository;
import com.eCommerce.backend.repository.SizeRepository;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;

    public ProductService(ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository) {
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());
    }

    public Product addProduct(@NotNull Product product) {
        Set<Size> managedSizes = new HashSet<>();
        for (Size size : product.getProductSizes()) {
            if (size.getName() == null) {
                throw new IllegalArgumentException("Size ID must not be null");
            }
            Size managedSize = sizeRepository.findByName(size.getName().toUpperCase())
                    .orElseThrow(() -> new ResourceNotFoundException("Size not found with ID: " + size.getId()));

            managedSizes.add(managedSize);
        }
        product.setProductSizes(managedSizes);

        Set<Color> managedColors = new HashSet<>();
        for (Color color : product.getProductColors()) {
            if (color.getId() == null) {
                throw new IllegalArgumentException("Color ID must not be null");
            }
            Color managedColor = colorRepository.findById(color.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Color not found with ID: " + color.getId()));

            managedColors.add(managedColor);
        }
        product.setProductColors(managedColors);

        return productRepository.save(product);
    }
}
