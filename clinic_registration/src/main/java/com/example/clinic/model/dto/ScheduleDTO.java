package com.example.clinic.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleDTO {

    private Integer id;
    private Integer doctorId;
    private String doctorName;
    private String dayOfWeek;     // 星期幾
    private String timePeriod;    // 上午 / 下午
    private Boolean available;
    private String departmentName;
}
