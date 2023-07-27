package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * 편지 엔티티
 */
@Entity
@Table(name = "letter")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Letter extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long no;

    @Column
    private String contents;

    @ManyToOne
    @JoinColumn(name = "email")
    private FUser fUser;

    @ManyToOne
    @JoinColumn(name = "member_no")
    private PMember pMember;

    @ManyToOne
    @JoinColumn(name = "uuid")
    private Meeting meeting;


}
