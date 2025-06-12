package com.example.clinic.repository;

import com.example.clinic.model.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    // ✅ 根據醫師 ID 查全部排班（例如在個人排班查詢用）
    List<Schedule> findByDoctorId(Integer doctorId);

    // ✅ 原本的 JPQL 查詢：用在固定科別 + 星期幾
    @Query("SELECT s FROM Schedule s WHERE s.doctor.department.name = :departmentName AND s.dayOfWeek = :dayOfWeek AND s.available = true")
    List<Schedule> findByDepartmentNameAndDayOfWeek(@Param("departmentName") String departmentName,
                                                    @Param("dayOfWeek") String dayOfWeek);

    // ✅ 根據醫師姓名查詢排班
    List<Schedule> findByDoctorName(String doctorName);

    // ✅ 根據科別名稱查詢全部排班
    List<Schedule> findByDoctorDepartmentName(String departmentName);

    // ✅ 根據科別與星期幾查詢（備用）
    List<Schedule> findByDoctorDepartmentNameAndDayOfWeek(String departmentName, String dayOfWeek);

    // ✅ 新增：根據一群醫師 ID 與星期幾查詢（提供給日期+科別查詢用）
    List<Schedule> findByDoctorIdInAndDayOfWeek(List<Integer> doctorIds, String dayOfWeek);
}
