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
    private final String host;
    private final int port;
    private final String username;
    private final String password;
    private final boolean auth;
    private final boolean starttlsEnable;
    private final String protocol;
    private final boolean debug;
    private final String encoding;

    public MailConfig(
            @Value("${spring.mail.host}") String host,
            @Value("${spring.mail.port}") int port,
            @Value("${spring.mail.username}") String username,
            @Value("${spring.mail.password}") String password,
            @Value("${spring.mail.properties.mail.smtp.auth}") boolean auth,
            @Value("${spring.mail.properties.mail.smtp.starttls.enable}") boolean starttlsEnable,
            @Value("${spring.mail.transport.protocol}") String protocol,
            @Value("${spring.mail.debug}") boolean debug,
            @Value("${spring.mail.default.encoding}") String encoding
    ) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.auth = auth;
        this.starttlsEnable = starttlsEnable;
        this.protocol = protocol;
        this.debug = debug;
        this.encoding = encoding;
    }

    @Bean
    public JavaMailSender javaMailSender() {

        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(host);
        javaMailSender.setPort(port);
        javaMailSender.setUsername(username);
        javaMailSender.setPassword(password);
        javaMailSender.setDefaultEncoding(encoding);
        javaMailSender.setJavaMailProperties(getProperties());

        return javaMailSender;
    }

    private Properties getProperties() {

        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", protocol);
        properties.setProperty("mail.smtp.auth", String.valueOf(auth));
        properties.setProperty("mail.smtp.starttls.enable", String.valueOf(starttlsEnable));
        properties.setProperty("mail.debug", String.valueOf(debug));

        return properties;
    }


}
