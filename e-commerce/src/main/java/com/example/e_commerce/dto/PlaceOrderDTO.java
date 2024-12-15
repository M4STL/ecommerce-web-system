package com.example.e_commerce.dto;

import lombok.Data;

@Data
public class PlaceOrderDTO {
    private  Long userId;
    private String address;
    private  String orderDescription;
    private String payment;
}
