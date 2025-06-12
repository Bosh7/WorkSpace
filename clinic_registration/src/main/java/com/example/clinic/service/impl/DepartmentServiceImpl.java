package com.example.clinic.service.impl;

import com.example.clinic.mapper.DepartmentMapper;
import com.example.clinic.model.dto.DepartmentDTO;
import com.example.clinic.model.entity.Department;
import com.example.clinic.repository.DepartmentRepository;
import com.example.clinic.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DepartmentMapper departmentMapper;

    // 查詢所有科別
    @Override
    public List<DepartmentDTO> findAll() {
        return departmentRepository.findAll().stream()
                .map(departmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 根據分類查詢（如「內科系」）
    @Override
    public List<DepartmentDTO> findByCategory(String category) {
        return departmentRepository.findAll().stream()
                .filter(dep -> dep.getCategory() != null && dep.getCategory().equals(category))
                .map(departmentMapper::toDTO)
                .collect(Collectors.toList());
    }

    // 新增科別
    @Override
    public DepartmentDTO create(DepartmentDTO dto) {
        // 若已有重複名稱就不新增（可依需求移除）
        if (departmentRepository.existsByName(dto.getName())) {
            throw new RuntimeException("已有重複的科別名稱：" + dto.getName());
        }
        Department saved = departmentRepository.save(departmentMapper.toEntity(dto));
        return departmentMapper.toDTO(saved);
    }
}
