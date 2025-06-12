package com.example.clinic.test;

import com.example.clinic.util.Hash;
import java.util.Scanner;

public class HashTest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("請輸入密碼：");
        String password = scanner.nextLine();

        // 產生 salt 並加密
        String salt = Hash.getSalt();
        String hash = Hash.getHash(password, salt);

        // 印出結果
        System.out.println("=== 加密結果 ===");
        System.out.println("Salt:  " + salt);
        System.out.println("Hash:  " + hash);

        // 測試再次加密驗證
        System.out.println("\n請再輸入一次密碼（驗證用）：");
        String inputPassword = scanner.nextLine();

        String verifyHash = Hash.getHash(inputPassword, salt);

        if (verifyHash.equals(hash)) {
            System.out.println("✅ 驗證成功：雜湊一致");
        } else {
            System.out.println("❌ 驗證失敗：雜湊不一致");
        }

        scanner.close();
    }
}
