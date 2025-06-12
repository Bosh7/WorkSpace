package com.example.clinic.mapper;

import com.example.clinic.model.dto.ScheduleHistoryDTO;
import com.example.clinic.model.entity.ScheduleHistory;
import org.springframework.stereotype.Component;

@Component
public class ScheduleHistoryMapper {

    // Entity → DTO
    public ScheduleHistoryDTO toDTO(ScheduleHistory entity) {
        if (entity == null) return null;

        return ScheduleHistoryDTO.builder()
                .id(entity.getId())
                .action(entity.getAction())
                .content(entity.getContent()) // 使用 content 統整醫師 + 時段資訊
                .timestamp(entity.getTimestamp())
                .operator(entity.getOperator())
                .build();
    }

    // DTO → Entity
    public ScheduleHistory toEntity(ScheduleHistoryDTO dto) {
        if (dto == null) return null;

        return ScheduleHistory.builder()
                .id(dto.getId())
                .action(dto.getAction())
                .content(dto.getContent()) // 統整格式由前端組好傳入
                .timestamp(dto.getTimestamp())
                .operator(dto.getOperator())
                .build();
    }
}
