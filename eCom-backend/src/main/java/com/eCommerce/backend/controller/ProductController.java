package com.eCommerce.backend.controller;

import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getProducts();
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        log.info(product.toString());
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
}
