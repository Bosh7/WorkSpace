package com.example.clinic.model.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {
    private Integer id;
    private String username;
    private String role;
}
