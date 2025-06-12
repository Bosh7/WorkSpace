package com.example.clinic.mapper;

import com.example.clinic.model.dto.RegistrationDTO;
import com.example.clinic.model.entity.Doctor;
import com.example.clinic.model.entity.Registration;
import org.springframework.stereotype.Component;

@Component
public class RegistrationMapper {

    public RegistrationDTO toDTO(Registration entity) {
        return RegistrationDTO.builder()
                .id(entity.getId())
                .idType(entity.getIdType())
                .idNumber(entity.getIdNumber())
                .departmentName(entity.getDoctor().getDepartment().getName())
                .doctorId(entity.getDoctor().getId())
                .doctorName(entity.getDoctor().getName())
                .dayOfWeek(entity.getDayOfWeek())
                .timePeriod(entity.getTimePeriod())
                .registrationDate(entity.getRegistrationDate())
                .build();
    }

    public Registration toEntity(RegistrationDTO dto, Doctor doctor) {
        return Registration.builder()
                .id(dto.getId())
                .idType(dto.getIdType())
                .idNumber(dto.getIdNumber())
                .doctor(doctor)
                .dayOfWeek(dto.getDayOfWeek())
                .timePeriod(dto.getTimePeriod())
                .registrationDate(dto.getRegistrationDate())
                .createdTime(java.time.LocalDateTime.now())
                .build();
    }
}
