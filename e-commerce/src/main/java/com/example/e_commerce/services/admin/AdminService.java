package com.example.e_commerce.services.admin;

import com.example.e_commerce.dto.CategoryDTO;
import com.example.e_commerce.dto.OrderDTO;
import com.example.e_commerce.dto.ProductDTO;
import com.example.e_commerce.entities.Category;
import com.example.e_commerce.entities.Product;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


public interface AdminService {
    Category createCategory(CategoryDTO categoryDTO);

    List<CategoryDTO> getAllCategories();

    Product postProduct(Long categoryId, ProductDTO productDTO) throws IOException;

    List<ProductDTO> getAllProducts();

    void deleteProduct(Long Id);

    ProductDTO getProductById(Long Id);

    ProductDTO updateProduct(Long categoryId, Long productId, ProductDTO productDTO) throws IOException;

    List<OrderDTO> getAllOrders();

    List<OrderDTO> getAllOrders(Long userId);
}
