package com.witchdelivery.messageapp.user.dto;

import lombok.Getter;

@Getter
public class UserPostDto {
    private String email;   // 이메일
    private String username; // 닉네임
    private String password;    // 패스워드
}
