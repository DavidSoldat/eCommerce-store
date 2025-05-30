package com.eCommerce.backend.dto;

import com.eCommerce.backend.model.Product.Color;
import com.eCommerce.backend.model.Product.Size;
import lombok.Data;

import java.util.List;

@Data
public class ColorsAndSizesDto {
    List<Color> colors;
    List<Size> sizes;
}
