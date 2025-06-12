package com.example.clinic.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDTO {

    private Integer id;             // 醫師 ID
    private String name;            // 醫師姓名
    private Integer departmentId;   // 所屬科別 ID
    private String departmentName;  // 所屬科別名稱（前端顯示用）
}
