package com.example.e_commerce.entities;

import com.example.e_commerce.dto.CartItemDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@SuppressWarnings("ALL")
@Entity
@Data
@Table(name = "cartItems")
public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int price;

    private Long quantity;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    public CartItemDTO getCartItemDTO(){
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setId(id);
        cartItemDTO.setQuantity(quantity);
        cartItemDTO.setProductId(product.getId());
        cartItemDTO.setProductName(product.getName());
        cartItemDTO.setReturnedImage(product.getImage());
        cartItemDTO.setPrice(price);
        cartItemDTO.setUserId(user.getId());
        return cartItemDTO;
    }
}
