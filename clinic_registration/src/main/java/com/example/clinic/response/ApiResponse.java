package com.example.clinic.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;

    //  成功回傳資料
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "成功", data);
    }

    //  自訂錯誤碼與訊息
    public static <T> ApiResponse<T> fail(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }

    //  快速錯誤訊息（預設使用 400）
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(400, message, null);
    }
}
