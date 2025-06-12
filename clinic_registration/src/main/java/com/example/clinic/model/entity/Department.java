package com.example.clinic.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "department") // 對應資料表名稱
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 主鍵：自動遞增

    @Column(nullable = false, unique = true, length = 50)
    private String name; // 科別名稱，如「心臟內科」

    @Column(length = 50)
    private String category; // 分類，如「內科系」、「外科系」
}
