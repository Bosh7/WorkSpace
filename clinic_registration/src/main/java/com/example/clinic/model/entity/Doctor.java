package com.example.clinic.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 醫師 ID（主鍵）

    @Column(nullable = false, length = 50)
    private String name; // 醫師姓名，例如「王小明」

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department; // 所屬科別（多對一關聯）
}
