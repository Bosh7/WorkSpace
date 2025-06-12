	package com.example.clinic.mapper;

import com.example.clinic.model.dto.ScheduleDTO;
import com.example.clinic.model.entity.Schedule;
import com.example.clinic.model.entity.Doctor;
import org.springframework.stereotype.Component;

@Component
public class ScheduleMapper {

    public ScheduleDTO toDTO(Schedule schedule) {
        return ScheduleDTO.builder()
                .id(schedule.getId())
                .doctorId(schedule.getDoctor().getId())
                .doctorName(schedule.getDoctor().getName())
                .dayOfWeek(schedule.getDayOfWeek())
                .timePeriod(schedule.getTimePeriod())
                .available(schedule.getAvailable())
                .departmentName(schedule.getDoctor().getDepartment().getName())
                .build();
        		
    }
    
    public Schedule toEntity(ScheduleDTO dto) {
        return Schedule.builder()
                .id(dto.getId())
                .doctor(Doctor.builder().id(dto.getDoctorId()).name(dto.getDoctorName()).build())
                .dayOfWeek(dto.getDayOfWeek())
                .timePeriod(dto.getTimePeriod())
                .available(dto.getAvailable())
                .build();
    }

    public Schedule toEntity(ScheduleDTO dto, Doctor doctor) {
        return Schedule.builder()
                .id(dto.getId())
                .doctor(doctor)
                .dayOfWeek(dto.getDayOfWeek())
                .timePeriod(dto.getTimePeriod())
                .available(dto.getAvailable())
                .build();
    }
    
}
