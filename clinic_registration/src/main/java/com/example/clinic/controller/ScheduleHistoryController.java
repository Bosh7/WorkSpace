package com.example.clinic.controller;

import com.example.clinic.model.dto.ScheduleHistoryDTO;
import com.example.clinic.service.ScheduleHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule-history")
public class ScheduleHistoryController {

    @Autowired
    private ScheduleHistoryService scheduleHistoryService;

    //  查詢所有歷史紀錄
    @GetMapping
    public List<ScheduleHistoryDTO> getAll() {
        return scheduleHistoryService.getAllHistory();
    }

    //  新增歷史紀錄
    @PostMapping
    public ScheduleHistoryDTO create(@RequestBody ScheduleHistoryDTO dto) {
        return scheduleHistoryService.create(dto);
    }
}
