package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * 인증 번호 엔티티
 */
@Entity
@Table(name = "certify")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Certify extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long no;

    @Column(nullable = false)
    private String code;

    @OneToOne
    @JoinColumn(name = "email")
    private FUser fUser;

}
