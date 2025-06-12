package com.example.clinic.controller;

import com.google.code.kaptcha.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;  // 
import java.awt.image.BufferedImage;
import java.io.IOException;

@RestController
public class CaptchaController {

    @Autowired
    private Producer captchaProducer;

    @GetMapping("/api/captcha")
    public void getCaptcha(HttpServletResponse response, HttpSession session) throws IOException {
        // 設定回傳類型為圖片
        response.setContentType("image/jpeg");

        // 禁止快取（避免舊圖被瀏覽器 cache）
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setHeader("Pragma", "no-cache");
        response.setDateHeader("Expires", 0);

        // 產生驗證碼文字
        String captchaText = captchaProducer.createText();
        session.setAttribute("captcha", captchaText); // 存進 session

        // 根據文字產生圖片
        BufferedImage image = captchaProducer.createImage(captchaText);
        ImageIO.write(image, "jpg", response.getOutputStream());
        // 輸出圖片到前端
        try {
            ImageIO.write(image, "jpg", response.getOutputStream());
        } catch (IOException e) {
            System.err.println("❌ 圖片輸出失敗：" + e.getMessage());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "無法產生驗證碼圖片");
        }
    }
}
