package com.example.clinic.service;

import com.example.clinic.model.dto.ScheduleHistoryDTO;
import java.util.List;

public interface ScheduleHistoryService {
    List<ScheduleHistoryDTO> getAllHistory();
    ScheduleHistoryDTO create(ScheduleHistoryDTO dto);
}
	