package com.example.clinic.controller;

import com.example.clinic.model.dto.DepartmentDTO;
import com.example.clinic.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin // 如果前端來自不同網域，需要開啟跨域（React 開發模式）
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    //  查詢所有科別：GET /api/departments
    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAll(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(departmentService.findByCategory(category));
        } else {
            return ResponseEntity.ok(departmentService.findAll());
        }
    }

    //  新增科別：POST /api/departments
    @PostMapping
    public ResponseEntity<DepartmentDTO> create(@RequestBody DepartmentDTO dto) {
        DepartmentDTO created = departmentService.create(dto);
        return ResponseEntity.ok(created);
    }
}
