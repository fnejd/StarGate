package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Table(name = "history")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class History extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long no;

    @Column
    private String contents;

    @ManyToOne
    @JoinColumn(name = "member_no", referencedColumnName = "member_no")
    private PMember pMember;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private FUser fUser;
}
