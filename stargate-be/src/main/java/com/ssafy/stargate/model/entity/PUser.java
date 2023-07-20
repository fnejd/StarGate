package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@Table(name = "p_user")
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

    @OneToMany(mappedBy = "pUser", cascade = CascadeType.ALL, orphanRemoval = true)
    List<PGroup> pGroups;

}
