package com.example.clinic.service.impl;

import com.example.clinic.mapper.DoctorMapper;
import com.example.clinic.model.dto.DoctorDTO;
import com.example.clinic.model.entity.Doctor;
import com.example.clinic.repository.DoctorRepository;
import com.example.clinic.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorMapper doctorMapper;

    @Override
    public List<DoctorDTO> findAll() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctorMapper.toDTOList(doctors);
    }

    @Override
    public List<DoctorDTO> findByDepartmentId(Integer departmentId) {
        List<Doctor> doctors = doctorRepository.findByDepartmentId(departmentId);
        return doctorMapper.toDTOList(doctors);
    }
    
    
    
}
