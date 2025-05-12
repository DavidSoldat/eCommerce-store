package com.eCommerce.backend.controller;

import com.eCommerce.backend.model.Product.Brand;
import com.eCommerce.backend.service.BrandService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    @Autowired
    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }

    @PostMapping
    public List<Brand> addBrand(@RequestBody Brand brand) {
        return brandService.addBrand(brand);
    }

    @DeleteMapping
    public ResponseEntity<String> removeBrand(@RequestBody Long brandId) {
        brandService.removeBrand(brandId);
        return new ResponseEntity<>("Brand removed successfully!", HttpStatus.OK);
    }
}
