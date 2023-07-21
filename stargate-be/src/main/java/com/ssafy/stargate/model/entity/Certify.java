package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Certify extends BaseEntity{
    @Id
    @Column(nullable = false)
    private String code;

    @OneToOne
    @JoinColumn(name = "email")
    private FUser fUser;

}
