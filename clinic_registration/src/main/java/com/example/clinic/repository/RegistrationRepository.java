package com.example.clinic.repository;

import com.example.clinic.model.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Integer> {

    // 某醫師某日期某時段已掛號的筆數（用於限制人數）
    long countByDoctorIdAndRegistrationDateAndTimePeriod(
        Integer doctorId,
        LocalDate date,
        String timePeriod
    );

    // 查詢某天的總掛號數（用於顯示看診人數）
    int countByRegistrationDate(LocalDate registrationDate);

    // 查詢指定醫師的掛號紀錄
    List<Registration> findByDoctorId(Integer doctorId);

    // 查詢某使用者（身分證或病歷號）的掛號紀錄
    List<Registration> findByIdTypeAndIdNumber(String idType, String idNumber);

    // ✅ 判斷是否已經重複掛號（用於限制同一人不能重複）
    boolean existsByIdTypeAndIdNumberAndDoctorIdAndRegistrationDateAndTimePeriod(
        String idType,
        String idNumber,
        Integer doctorId,
        LocalDate registrationDate,
        String timePeriod
    );
}
