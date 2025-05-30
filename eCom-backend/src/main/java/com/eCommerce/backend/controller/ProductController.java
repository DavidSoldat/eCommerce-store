package com.eCommerce.backend.controller;

import com.eCommerce.backend.dto.ColorsAndSizesDto;
import com.eCommerce.backend.dto.ProductDetailsDto;
import com.eCommerce.backend.model.Product.Product;
import com.eCommerce.backend.repository.ColorRepository;
import com.eCommerce.backend.repository.SizeRepository;
import com.eCommerce.backend.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;

    public ProductController(ProductService productService, ColorRepository colorRepository, SizeRepository sizeRepository) {
        this.productService = productService;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
    }

    @GetMapping
    public List<ProductDetailsDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable Long productId) {
        Product foundProduct = productService.getProduct(productId);
        return new ResponseEntity<>(foundProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeProduct(@PathVariable Long productId) {
        productService.removeProduct(productId);
        return new ResponseEntity<>("Product removed", HttpStatus.OK);
    }

    @GetMapping("/colorsAndSizes")
    public ResponseEntity<ColorsAndSizesDto> getColorsAndSizes() {
        ColorsAndSizesDto response = new ColorsAndSizesDto();
        response.setColors(colorRepository.findAll());
        response.setSizes(sizeRepository.findAll());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
