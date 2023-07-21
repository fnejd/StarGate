package com.ssafy.stargate.model.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 팬 유저 엔티티
 */
@Entity
@Table(name = "f_user")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class FUser extends BaseEntity {
    @Id
    @Column
    private String email;

    @Column(nullable = false)
    private String name;

    @Column
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column
    private LocalDateTime birthday;
}
