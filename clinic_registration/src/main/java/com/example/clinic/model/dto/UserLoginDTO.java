package com.example.clinic.model.dto;

import lombok.Data;

@Data
public class UserLoginDTO {
    private String username;
    private String password;
    private String captcha;
}
