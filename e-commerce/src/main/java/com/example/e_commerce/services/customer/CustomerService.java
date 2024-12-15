package com.example.e_commerce.services.customer;


import com.example.e_commerce.dto.CartItemDTO;
import com.example.e_commerce.dto.OrderDTO;
import com.example.e_commerce.dto.PlaceOrderDTO;
import com.example.e_commerce.dto.ProductDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {
    List<ProductDTO> getAllProducts();

    List<ProductDTO> searchProductsByTitle(String title);

    ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO);

    OrderDTO getCartByUserId(Long userId);

    OrderDTO addMinusOnProduct(Long userId, Long productId);

    OrderDTO addPlusOnProduct(Long userId, Long productId);

    OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO);

    List<OrderDTO> getOrdersByUserId(Long userId);

}
