package com.member.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // 스프링 설정 클래스임을 나타냄
public class WebConfig implements WebMvcConfigurer {

    // CORS 설정 메서드
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // /api로 시작하는 모든 경로에 대해
                .allowedOrigins("http://localhost:3000") // 리액트 개발 서버의 접근 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 지정
                .allowCredentials(true); // 쿠키 및 인증정보 전달 허용
    }
}
