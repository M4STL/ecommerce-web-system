package com.example.e_commerce.services.customer;

import com.example.e_commerce.dto.CartItemDTO;
import com.example.e_commerce.dto.OrderDTO;
import com.example.e_commerce.dto.PlaceOrderDTO;
import com.example.e_commerce.dto.ProductDTO;
import com.example.e_commerce.entities.CartItems;
import com.example.e_commerce.entities.Order;
import com.example.e_commerce.entities.Product;
import com.example.e_commerce.entities.User;
import com.example.e_commerce.enums.OrderStatus;
import com.example.e_commerce.repository.CartItemsRepository;
import com.example.e_commerce.repository.OrderRepository;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final CartItemsRepository cartItemsRepository;
    private final UserRepository userRepository;

    @Override
    public List<ProductDTO> getAllProducts(){
        return productRepository.findAll().stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> searchProductsByTitle(String title){
        return productRepository.findAllByNameContaining(title).stream().map(Product::getProductDTO).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO) {
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(cartItemDTO.getUserId(), OrderStatus.PENDING);
        Optional<CartItems> optionalCartItem = cartItemsRepository.findByUserIdAndProductIdAndOrderId(
                cartItemDTO.getUserId(),
                cartItemDTO.getProductId(),
                cartItemDTO.getOrderId());
        if(optionalCartItem.isPresent()){
            CartItemDTO productAlreadyExistInCart = new CartItemDTO();
            productAlreadyExistInCart.setProductId(null);
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(productAlreadyExistInCart);
        }else{
            Optional<Product> optionalProduct = productRepository.findById(cartItemDTO.getProductId());
            Optional<User> optionalUser = userRepository.findById(cartItemDTO.getUserId());
            if(optionalProduct.isPresent() && optionalUser.isPresent()){
                Product product = optionalProduct.get();
                CartItems cartItems = new CartItems();
                cartItems.setProduct(product);
                cartItems.setUser(optionalUser.get());
                cartItems.setQuantity(1L);
                cartItems.setOrder(pendingOrder);
                cartItems.setPrice(product.getPrice());
                CartItems updatedCart = cartItemsRepository.save(cartItems);
                pendingOrder.setPrice(pendingOrder.getPrice() + cartItems.getPrice());
                pendingOrder.getCartItems().add(cartItems);
                orderRepository.save(pendingOrder);
                CartItemDTO updatedCartItemDTO = new CartItemDTO();
                updatedCartItemDTO.setId(cartItems.getId());
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedCartItemDTO);
            }else{
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Product not found");
            }
        }

    }

    @Override
    public OrderDTO getCartByUserId(Long userId){
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        List<CartItemDTO> cartItemDTOList = pendingOrder.getCartItems().stream().map(CartItems::getCartItemDTO).collect(Collectors.toList());
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCartItemDTOList(cartItemDTOList);
        orderDTO.setAmount(pendingOrder.getPrice());
        orderDTO.setId(pendingOrder.getId());
        orderDTO.setOrderStatus(pendingOrder.getOrderStatus());
        return orderDTO;
    }

    @Override
    public OrderDTO addMinusOnProduct(Long userId, Long productId) {
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByUserIdAndProductIdAndOrderId(userId, productId, pendingOrder.getId());
        if(optionalCartItems.isPresent() && optionalProduct.isPresent()){
            CartItems cartItems = optionalCartItems.get();
            cartItems.setQuantity(optionalCartItems.get().getQuantity() - 1);
            pendingOrder.setPrice(pendingOrder.getPrice() + optionalProduct.get().getPrice());
            cartItemsRepository.save(cartItems);
            orderRepository.save(pendingOrder);
            return pendingOrder.getOrderDTO();
        }
        return null;
    }

    @Override
    public OrderDTO addPlusOnProduct(Long userId, Long productId) {
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Optional<CartItems> optionalCartItems = cartItemsRepository.findByUserIdAndProductIdAndOrderId(userId, productId, pendingOrder.getId());
        if(optionalCartItems.isPresent() && optionalProduct.isPresent()){
            CartItems cartItems = optionalCartItems.get();
            cartItems.setQuantity(optionalCartItems.get().getQuantity() + 1);
            pendingOrder.setPrice(pendingOrder.getPrice() + optionalProduct.get().getPrice());
            cartItemsRepository.save(cartItems);
            orderRepository.save(pendingOrder);
            return pendingOrder.getOrderDTO();
        }
        return null;
    }

    @Override
    public OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO){
        Order existingOrder = orderRepository.findByUserIdAndOrderStatus(placeOrderDTO.getUserId(), OrderStatus.PENDING);
        Optional<User> optionalUser = userRepository.findById(placeOrderDTO.getUserId());
        if(optionalUser.isPresent()){
            existingOrder.setOrderStatus(OrderStatus.SUBMITTED);
            existingOrder.setAddress(placeOrderDTO.getAddress());
            existingOrder.setDate(new Date());
            existingOrder.setPaymentType(placeOrderDTO.getPayment());
            existingOrder.setDescription(placeOrderDTO.getOrderDescription());
            existingOrder.setPrice(existingOrder.getPrice());
            orderRepository.save(existingOrder);
            Order order = new Order();
            order.setOrderStatus(OrderStatus.PENDING);
            order.setUser(optionalUser.get());
            order.setPrice(0L);
            orderRepository.save(order);
            return order.getOrderDTO();
        }
        return null;
    }
@Override
    public List<OrderDTO> getOrdersByUserId(Long userId){
        return orderRepository.findAllByUserIdAndOrderStatus(userId,OrderStatus.SUBMITTED).stream().map(Order::getOrderDTO).collect(Collectors.toList());
    }

}
