package com.ssafy.stargate.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * 암호화 관련 설정을 보관한다.
 * <ul>
 *     <li>비밀번호 암호화 bcrypt 설정</li>
 * </ul>
 */
@Component
public class EncoderConfig {
    /**
     * 비밀번호 암호화용 Bcrypt 객체를 생성한다.
     * @return BCrypt암호화 객체
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
