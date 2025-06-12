package com.example.clinic.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "registration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String idType;      // 身分證號 or 病歷號
    private String idNumber;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String dayOfWeek;   // 星期幾
    private String timePeriod;  // 上午 / 下午
    private LocalDate registrationDate;

    private LocalDateTime createdTime; // 建立時間
    
    
    
}
