package com.ssafy.stargate.config;

import java.util.Properties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * SMTP 발송을 위한 메일 설정
 */
@Configuration
@Slf4j
public class MailConfig {

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private boolean auth;

    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private boolean starttlsEnable;

    @Value("${spring.mail.transport.protocol}")
    private String protocol;

    @Value("${spring.mail.debug}")
    private boolean debug;

    @Value("${spring.mail.default.encoding}")
    private String encoding;

    @Bean
    public JavaMailSender javaMailSender(){

        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(host);
        javaMailSender.setPort(port);
        javaMailSender.setUsername(username);
        javaMailSender.setPassword(password);
        javaMailSender.setDefaultEncoding(encoding);
        javaMailSender.setJavaMailProperties(getProperties());

        return javaMailSender;
    }

    private Properties getProperties(){

        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", protocol);
        properties.setProperty("mail.smtp.auth", String.valueOf(auth));
        properties.setProperty("mail.smtp.starttls.enable", String.valueOf(starttlsEnable));
        properties.setProperty("mail.debug", String.valueOf(debug));

        return properties;
    }


}
