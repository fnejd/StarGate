package com.ssafy.stargate.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
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
