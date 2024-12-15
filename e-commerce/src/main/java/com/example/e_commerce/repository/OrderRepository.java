package com.example.e_commerce.repository;

import com.example.e_commerce.entities.Order;
import com.example.e_commerce.enums.OrderStatus;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@SuppressWarnings("ALL")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);


    List<Order> findAllByUserIdAndOrderStatus(Long userId,OrderStatus orderStatus);

   // Collection<Object> findAllByUserIdAndOrderStatus(SingularAttribute<AbstractPersistable, Serializable> id, OrderStatus orderStatus);
}
