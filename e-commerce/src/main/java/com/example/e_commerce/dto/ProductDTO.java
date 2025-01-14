package com.example.e_commerce.dto;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDTO {

    private long id;
    private String name;

    private String description;
    private  Integer price;
    private MultipartFile image;
    private  byte[] returnedImage;
    private long categoryId;
    private String categoryName;
}
