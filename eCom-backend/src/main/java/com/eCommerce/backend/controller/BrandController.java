package com.eCommerce.backend.controller;

import com.eCommerce.backend.dto.AddBrandDto;
import com.eCommerce.backend.dto.EditBrandDto;
import com.eCommerce.backend.model.Product.Brand;
import com.eCommerce.backend.service.BrandService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PostMapping("/add")
    public ResponseEntity<String> addBrand(@RequestBody AddBrandDto data) {
        Brand brand = new Brand();
        log.info("Received data:", data.getName());
        brand.setName(data.getName());
        log.info("Saved brand", brand.getName());
        brandService.addBrand(brand);
        return new ResponseEntity<>("New brand added", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> removeBrand(@RequestBody Long brandId) {
        brandService.removeBrand(brandId);
        return new ResponseEntity<>("Brand removed successfully!", HttpStatus.OK);
    }

    @PatchMapping("/edit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> editBrand(@RequestBody EditBrandDto data) {
        brandService.editBrand(data);
        return new ResponseEntity<>("Brand saved", HttpStatus.OK);
    }
}
