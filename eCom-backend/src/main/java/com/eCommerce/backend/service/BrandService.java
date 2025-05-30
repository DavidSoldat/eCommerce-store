package com.eCommerce.backend.service;

import com.eCommerce.backend.dto.EditBrandDto;
import com.eCommerce.backend.exception.ResourceNotFoundException;
import com.eCommerce.backend.model.Product.Brand;
import com.eCommerce.backend.repository.BrandRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BrandService {

    private final BrandRepository brandRepository;

    @Autowired
    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public void addBrand(Brand brand) {
        brandRepository.save(brand);
    }

    public void removeBrand(Long brandId) {
        brandRepository.deleteById(brandId);
    }

    public void editBrand(EditBrandDto data) {
        Brand brand = brandRepository.findById(data.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found "));
        brand.setName(data.getName());
        brandRepository.save(brand);
    }
}
