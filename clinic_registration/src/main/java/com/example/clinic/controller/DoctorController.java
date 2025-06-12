package com.example.clinic.controller;

import com.example.clinic.model.dto.DoctorDTO;
import com.example.clinic.repository.DoctorRepository;
import com.example.clinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private DoctorRepository doctorRepository;

    // 查詢所有醫師
    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAll() {
        return ResponseEntity.ok(doctorService.findAll());
    }

    // 根據科別查詢
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<DoctorDTO>> getByDepartment(@PathVariable Integer departmentId) {
        return ResponseEntity.ok(doctorService.findByDepartmentId(departmentId));
    }
    
    //透過 doctorRepository 去查詢名字為 name 的醫生
    @GetMapping("/find-id")
    public ResponseEntity<Integer> getDoctorIdByName(@RequestParam String name) {
        return doctorRepository.findByName(name)
                .map(doctor -> ResponseEntity.ok(doctor.getId()))
                .orElse(ResponseEntity.notFound().build());
    }
    

}
