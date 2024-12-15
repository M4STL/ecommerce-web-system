package com.example.e_commerce.entities;

import com.example.e_commerce.dto.CategoryDTO;
import jakarta.persistence.*;
import lombok.Data;

import static jakarta.persistence.GenerationType.IDENTITY;

@SuppressWarnings("ALL")
@Entity
@Data
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private long id;
    private String name;
    @Lob
    private String description;

    public CategoryDTO getCategoryDTO() {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(id);
        categoryDTO.setName(name);
        categoryDTO.setDescription(description);
        return categoryDTO;
    }
}
