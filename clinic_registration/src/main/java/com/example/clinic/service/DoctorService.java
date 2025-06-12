package com.example.clinic.service;

import com.example.clinic.model.dto.DoctorDTO;

import java.util.List;

public interface DoctorService {
    List<DoctorDTO> findAll();
    List<DoctorDTO> findByDepartmentId(Integer departmentId);
    
}
