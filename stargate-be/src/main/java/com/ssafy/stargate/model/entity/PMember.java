package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "p_member")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class PMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_no")
    private long memberNo;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "group_no", referencedColumnName = "group_no")
    private PGroup pGroup;
}
