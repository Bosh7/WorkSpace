package com.example.clinic.controller;

import com.example.clinic.model.dto.ScheduleDTO;
import com.example.clinic.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    // 查詢所有排班資料
    @GetMapping
    public List<ScheduleDTO> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    // 根據醫師姓名查排班
    @GetMapping("/doctor")
    public List<ScheduleDTO> getByDoctor(@RequestParam String name) {
        return scheduleService.getSchedulesByDoctorName(name);
    }

    // 根據科別查排班
    @GetMapping("/department")
    public List<ScheduleDTO> getByDepartment(@RequestParam String name) {
        return scheduleService.getSchedulesByDepartment(name);
    }
    
    // 根據日期+科別查詢
    @GetMapping("/search-by-department-and-date")
    public List<ScheduleDTO> findByDepartmentAndDate(
            @RequestParam String departmentName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return scheduleService.findByDepartmentAndDate(departmentName, date);
    }
    
    // 新增排班
    @PostMapping
    public ResponseEntity<String> addSchedule(@RequestBody ScheduleDTO dto) {
        scheduleService.addSchedule(dto);
        return ResponseEntity.ok("新增排班成功");
    }
    
    // 刪除排班
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        scheduleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
