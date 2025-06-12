package com.example.clinic.service.impl;

import com.example.clinic.mapper.ScheduleHistoryMapper;
import com.example.clinic.model.dto.ScheduleHistoryDTO;
import com.example.clinic.model.entity.ScheduleHistory;
import com.example.clinic.repository.ScheduleHistoryRepository;
import com.example.clinic.service.ScheduleHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleHistoryServiceImpl implements ScheduleHistoryService {

    @Autowired
    private ScheduleHistoryRepository scheduleHistoryRepository;

    @Autowired
    private ScheduleHistoryMapper scheduleHistoryMapper;

    @Override
    public List<ScheduleHistoryDTO> getAllHistory() {
        return scheduleHistoryRepository.findAll().stream()
                .map(scheduleHistoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ScheduleHistoryDTO create(ScheduleHistoryDTO dto) {
        ScheduleHistory entity = ScheduleHistory.builder()
                .action(dto.getAction())
                .content(dto.getContent())
                .operator(dto.getOperator())
                .timestamp(java.time.ZonedDateTime.now(java.time.ZoneId.of("Asia/Taipei")).toLocalDateTime())
                .build();

        ScheduleHistory saved = scheduleHistoryRepository.save(entity);
        return scheduleHistoryMapper.toDTO(saved);
    }
}
