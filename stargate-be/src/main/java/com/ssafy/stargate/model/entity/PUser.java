package com.ssafy.stargate.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
public class PUser {

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "code")
    private String code;

    @Column(name = "password")
    private String password;

    @Column(name = "join_date",columnDefinition = "timestamp default current_timestamp()")
    private LocalDateTime joinDate;

}
