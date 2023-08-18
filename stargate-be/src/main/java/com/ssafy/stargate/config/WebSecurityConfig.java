package com.ssafy.stargate.config;

import com.ssafy.stargate.filter.JwtExceptionFilter;
import com.ssafy.stargate.filter.JwtExceptionFilter;
import com.ssafy.stargate.filter.JwtFilter;
import lombok.RequiredArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtFilter jwtFilter;
    private final JwtExceptionFilter jwtExceptionFilter;

    private final JwtFilter jwtFilter;
    private final JwtExceptionFilter jwtExceptionFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((request) -> request
                        .requestMatchers("/tests/jwt-auth").authenticated()
                        .requestMatchers("/tests/**").permitAll()
                        .requestMatchers("/pusers/register", "/pusers/check-email",
                                "/pusers/login", "/fusers/register", "/fusers/login",
                                "/fusers/find-id", "/fusers/get-code", "/fusers/check-code",
                                "/fusers/new-pw", "/fusers/check-email","/meetingroom/member/get"
                                "/fusers/new-pw", "/fusers/check-email","/meetingroom/member/get"
                        ).anonymous()
                        .requestMatchers("/pdashboard").hasAuthority("Producer")
                        .requestMatchers("/rtc/**").permitAll()
                        .requestMatchers("/wss/**").permitAll()
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/histories/**").permitAll() // TODO: 멤버 인증 권한 어떻게? 우선 공개로 함
                        .anyRequest().authenticated()
                )
                .httpBasic(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(httpSecuritySessionManagementConfigurer -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtFilter.class);
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost", "http://localhost:3000","https://stargatea406.netlify.app/"));
        config.setAllowedOrigins(Arrays.asList("http://localhost", "http://localhost:3000","https://stargatea406.netlify.app/"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
