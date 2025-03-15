package com.eCommerce.backend.service;

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
        List<Brand> brands =  brandRepository.findAll();
        log.info(brands.toString());
        return brands;
    }
}
