package com.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // getter, setter, toString, equals, hashCode 자동 생성
@NoArgsConstructor // 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 생성
public class MemberDTO {
    private Long id;       // 회원 고유 번호
    private String name;   // 회원 이름
    private int age;       // 회원 나이
    private String phone;  // 회원 전화번호
    private String address;// 회원 주소
}
