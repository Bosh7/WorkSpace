package com.example.clinic.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 關聯到醫師
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "day_of_week", length = 10, nullable = false)
    private String dayOfWeek;

    @Column(name = "time_period", length = 10, nullable = false)
    private String timePeriod; // 上午／下午

    @Column(name = "available")
    private Boolean available;
}
