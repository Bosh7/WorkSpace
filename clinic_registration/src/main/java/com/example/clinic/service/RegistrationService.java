package com.example.clinic.service;

import com.example.clinic.model.dto.RegistrationDTO;

import java.time.LocalDate;
import java.util.List;

public interface RegistrationService {
    RegistrationDTO register(RegistrationDTO dto);
    List<RegistrationDTO> getByDoctor(Integer doctorId);
    List<RegistrationDTO> getByIdTypeAndNumber(String idType, String idNumber);
    List<RegistrationDTO> getAll();
    void deleteById(Integer id);
    int countByDate(LocalDate date);
}
