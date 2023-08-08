package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "polaroid")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Polaroid extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long no;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private FUser fUser;

    @ManyToOne
    @JoinColumn(name = "member_no", referencedColumnName = "member_no")
    private PMember pMember;

    @ManyToOne
    @JoinColumn(name = "uuid", referencedColumnName = "uuid")
    private Meeting meeting;

    private String image;
}