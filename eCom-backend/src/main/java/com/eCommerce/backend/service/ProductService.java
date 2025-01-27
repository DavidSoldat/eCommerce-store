package com.eCommerce.backend.service;

import com.eCommerce.backend.model.Product;
import com.eCommerce.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public void addProduct(Product product) {
        Optional<Product> productOptional = productRepository.findById(product.getId());
        if(productOptional.isPresent()) {
            throw new IllegalStateException("Product already exists!");
        }
        productRepository.save(product);
    }
}
