package com.example.clinic.service;

import com.example.clinic.model.dto.ScheduleDTO;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {

    /**
     * 查詢所有排班
     */
    List<ScheduleDTO> getAllSchedules();

    /**
     * 根據醫師姓名查詢排班
     */
    List<ScheduleDTO> getSchedulesByDoctorName(String doctorName);

    /**
     * 根據科別名稱查詢排班
     */
    List<ScheduleDTO> getSchedulesByDepartment(String departmentName);

    /**
     * 根據科別 + 日期查詢（轉為星期幾後找出該日的排班）
     */
    List<ScheduleDTO> findByDepartmentAndDate(String departmentName, LocalDate date);

    /**
     * 新增排班
     */
    void addSchedule(ScheduleDTO dto);

    /**
     * 刪除排班（方法一）
     */
    void deleteSchedule(Integer id);

    /**
     * 刪除排班（方法二，與 deleteSchedule 重複，可選擇保留一個）
     */
    void deleteById(Integer id);
}
