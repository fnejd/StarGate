package com.ssafy.stargate.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

/**
 * refreshToken 저장을 위한 엔티티
 */
@Entity
@Table(name = "jwt_token")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class JwtToken {

    @Id
    @Column(nullable = false)
    private String email;

    @Column
    private String refreshToken;


}
