package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Table(name = "p_group")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class PGroup extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "group_no")
    private long groupNo;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "pGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PMember> members;

    @ManyToOne
    @JoinColumn(name = "email",referencedColumnName = "email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PUser pUser;


}
