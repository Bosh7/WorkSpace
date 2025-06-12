package com.example.clinic.controller;

import com.example.clinic.model.dto.RegistrationDTO;
import com.example.clinic.response.ApiResponse;
import com.example.clinic.service.RegistrationService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // 新增掛號
    @PostMapping
    public ApiResponse<RegistrationDTO> register(@RequestBody RegistrationDTO dto) {
        RegistrationDTO result = registrationService.register(dto);
        return ApiResponse.success(result);
    }

    // 查詢醫師的所有掛號紀錄
    @GetMapping("/doctor/{id}")
    public List<RegistrationDTO> getByDoctor(@PathVariable Integer id) {
        return registrationService.getByDoctor(id);
    }

    // 查詢個人掛號紀錄（用戶端，有驗證碼）
    @GetMapping("/search")
    public ApiResponse<List<RegistrationDTO>> getByIdNumber(
            @RequestParam String idType,
            @RequestParam String idNumber,
            @RequestParam String captcha,
            HttpSession session
    ) {
        // 驗證碼比對
        String expectedCaptcha = (String) session.getAttribute("captcha");
        if (expectedCaptcha == null || !expectedCaptcha.equalsIgnoreCase(captcha)) {
            return ApiResponse.error("驗證碼錯誤，請重新輸入");
        }

        List<RegistrationDTO> results = registrationService.getByIdTypeAndNumber(idType, idNumber);
        return ApiResponse.success(results);
    }

    // 查詢所有掛號（後台）
    @GetMapping
    public ApiResponse<List<RegistrationDTO>> getAll() {
        List<RegistrationDTO> results = registrationService.getAll();
        return ApiResponse.success(results);
    }

    // 刪除掛號
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Integer id) {
        registrationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // 查詢指定日期的掛號人數（提供給前端顯示人數使用）
    @GetMapping("/count")
    public Map<String, Integer> getRegistrationCountByDate(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        int count = registrationService.countByDate(localDate);
        int limit = 30; // 上限人數（如需改為科別/醫師別，請擴充參數）

        Map<String, Integer> result = new HashMap<>();
        result.put("count", count);
        result.put("limit", limit);
        return result;
    }
}
