package com.example.clinic.service;

import com.example.clinic.model.dto.DepartmentDTO;

import java.util.List;

public interface DepartmentService {

    // 查詢所有科別
    List<DepartmentDTO> findAll();

    // 根據分類查詢（例如：內科系）
    List<DepartmentDTO> findByCategory(String category);

    // 新增一筆科別
    DepartmentDTO create(DepartmentDTO dto);
}
