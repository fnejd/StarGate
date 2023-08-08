package com.ssafy.stargate.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 팬 유저 엔티티
 */
@Entity
@Table(name = "f_user")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
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

    @Column(nullable = false)
    private String phone;

    @OneToOne(mappedBy = "fUser")
    private Certify certify;

    @OneToMany(mappedBy = "fUser")
    @Builder.Default
    private List<Letter> letters = new ArrayList<>();

}
