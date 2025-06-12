package com.example.clinic.mapper;

import com.example.clinic.model.dto.DepartmentDTO;
import com.example.clinic.model.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {

    // Entity ➡ DTO
    public DepartmentDTO toDTO(Department entity) {
        if (entity == null) return null;

        return DepartmentDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .category(entity.getCategory())
                .build();
    }

    // DTO ➡ Entity
    public Department toEntity(DepartmentDTO dto) {
        if (dto == null) return null;

        return Department.builder()
                .id(dto.getId())
                .name(dto.getName())
                .category(dto.getCategory())
                .build();
    }
}
