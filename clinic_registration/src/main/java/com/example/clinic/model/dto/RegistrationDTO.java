package com.example.clinic.model.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationDTO {

    private Integer id;                 // 掛號紀錄主鍵 ID

    private String idType;             // 識別類型（如：身分證號、病歷號）
    private String idNumber;           // 識別號碼（如：A123456789 或 0123456789）

    private Integer doctorId;          // 醫師 ID（外鍵）
    private String doctorName;         // 醫師姓名（前端顯示用）

    private String dayOfWeek;          // 星期幾（如：星期一）
    private String timePeriod;         // 時段（上午／下午／晚上）

    private LocalDate registrationDate; // 掛號日期（例如 2025-07-01）

    private String departmentName;     // 科別名稱（如：內科、心臟科）

}
