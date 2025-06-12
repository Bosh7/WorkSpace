package com.example.clinic.repository;

import com.example.clinic.model.entity.Doctor;
import com.example.clinic.model.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    // 根據科別實體查詢該科所有醫師
    List<Doctor> findByDepartment(Department department);

    // 根據科別 ID 查詢所有醫師
    List<Doctor> findByDepartmentId(Integer departmentId);

    // 根據醫師姓名查詢（常用）
    Optional<Doctor> findByName(String name);

    // ✅ 根據科別名稱查詢所有醫師（供前端日期 + 科別用）
    List<Doctor> findByDepartmentName(String departmentName);
}
