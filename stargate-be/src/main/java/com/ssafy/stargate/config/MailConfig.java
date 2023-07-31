package com.ssafy.stargate.config;

import java.util.Properties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

//@Configuration
//@Slf4j
//public class MailConfig {
//
//    @Value("${spring.mail.host}")
//    private String host;
//
//    @Value("${spring.mail.port}")
//    private int port;
//
//    @Value("${spring.mail.username}")
//    private String username;
//
//    @Value("${spring.mail.password}")
//    private String password;
//
//    @Value("${spring.mail.properties.mail.smtp.auth}")
//    private boolean auth;
//
//    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
//    private boolean starttlsEnable;
//
//    @Value("${spring.mail.properties.mail.smtp.starttls.required}")
//    private boolean starttlsRequired;
//
//    @Value("${spring.mail.transport.protocol}")
//    private String protocol;
//
//    @Value("${spring.mail.debug}")
//    private boolean debug;
//
//    @Value("${spring.mail.default.encoding}")
//    private String encoding;
//
//    @Bean
//    public JavaMailSender javaMailSender(){
//
//        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
//        javaMailSender.setHost(host);
//        javaMailSender.setPort(port);
//        javaMailSender.setUsername(username);
//        javaMailSender.setPassword(password);
//        javaMailSender.setDefaultEncoding(encoding);
//        javaMailSender.setJavaMailProperties(getProperties());
//
//        return javaMailSender;
//    }
//
//    private Properties getProperties(){
//
//        Properties properties = new Properties();
//        properties.put("mail.transport.protocol", protocol);
//        properties.put("mail.smtp.auth", auth);
//        properties.put("mail.smtp.starttls.enable", starttlsEnable);
//        properties.put("mail.smtp.starttls.required", starttlsRequired);
//        properties.put("mail.smtp.debug", debug);
//
//        return properties;
//    }
//
//
//}
