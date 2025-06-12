package com.example.clinic.repository;

import com.example.clinic.model.entity.ScheduleHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleHistoryRepository extends JpaRepository<ScheduleHistory, Integer> {
   
}
