package com.example.clinic.model.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentDTO {
    private Integer id;         // 科別 ID
    private String name;        // 科別名稱（例如：心臟內科）
    private String category;    // 所屬群組（例如：內科系）
}
