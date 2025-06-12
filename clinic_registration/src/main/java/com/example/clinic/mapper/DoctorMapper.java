package com.example.clinic.mapper;

import com.example.clinic.model.dto.DoctorDTO;
import com.example.clinic.model.entity.Doctor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DoctorMapper {

    // Entity → DTO
    public DoctorDTO toDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .id(doctor.getId())
                .name(doctor.getName())
                .departmentId(doctor.getDepartment().getId())
                .departmentName(doctor.getDepartment().getName())
                .build();
    }

    // DTO → Entity
    public Doctor toEntity(DoctorDTO dto) {
        Doctor doctor = new Doctor();
        doctor.setId(dto.getId());
        doctor.setName(dto.getName());
        return doctor;
    }

    // 批次轉換
    public List<DoctorDTO> toDTOList(List<Doctor> doctors) {
        return doctors.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}
