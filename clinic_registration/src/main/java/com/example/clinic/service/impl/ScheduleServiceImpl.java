package com.example.clinic.service.impl;

import com.example.clinic.mapper.ScheduleMapper;
import com.example.clinic.model.dto.ScheduleDTO;
import com.example.clinic.model.entity.Doctor;
import com.example.clinic.model.entity.Schedule;
import com.example.clinic.repository.DoctorRepository;
import com.example.clinic.repository.ScheduleRepository;
import com.example.clinic.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Override
    public List<ScheduleDTO> getAllSchedules() {
        List<Schedule> schedules = scheduleRepository.findAll();
        return schedules.stream()
                .map(scheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> getSchedulesByDoctorName(String doctorName) {
        List<Schedule> schedules = scheduleRepository.findByDoctorName(doctorName);
        return schedules.stream()
                .map(scheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> getSchedulesByDepartment(String departmentName) {
        List<Schedule> schedules = scheduleRepository.findByDoctorDepartmentName(departmentName);
        return schedules.stream()
                .map(scheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ScheduleDTO> findByDepartmentAndDate(String departmentName, LocalDate date) {
        String chineseDay = convertToChineseDay(date.getDayOfWeek());

        // 查出所有該科別的醫師
        List<Doctor> doctors = doctorRepository.findByDepartmentName(departmentName);
        List<Integer> doctorIds = doctors.stream()
                                         .map(Doctor::getId)
                                         .collect(Collectors.toList());

        if (doctorIds.isEmpty()) return List.of();

        // 查排班
        List<Schedule> schedules = scheduleRepository.findByDoctorIdInAndDayOfWeek(doctorIds, chineseDay);

        return schedules.stream()
                .map(scheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void addSchedule(ScheduleDTO dto) {
        Schedule entity = scheduleMapper.toEntity(dto);
        scheduleRepository.save(entity);
    }

    @Override
    public void deleteSchedule(Integer id) {
        scheduleRepository.deleteById(id);
    }

    @Override
    public void deleteById(Integer id) {
        scheduleRepository.deleteById(id);
    }

    private String convertToChineseDay(DayOfWeek day) {
        return switch (day) {
            case MONDAY -> "星期一";
            case TUESDAY -> "星期二";
            case WEDNESDAY -> "星期三";
            case THURSDAY -> "星期四";
            case FRIDAY -> "星期五";
            case SATURDAY -> "星期六";
            case SUNDAY -> "星期日";
        };
    }
}
