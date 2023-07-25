package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Table(name = "p_user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
public class PUser extends BaseEntity{

    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "join_date", columnDefinition = "timestamp default current_timestamp()")
    private LocalDateTime joinDate;

    @OneToMany(mappedBy = "pUser", cascade = CascadeType.ALL, orphanRemoval = true)
    List<PGroup> pGroups;

}
