package com.example.clinic.model.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleHistoryDTO {
    private Integer id;

    private String action;       // 操作：新增排班、刪除排班
    private String content;      // 紀錄內容：xxx 星期x 上午
    private LocalDateTime timestamp;

    
    private String operator;
}
