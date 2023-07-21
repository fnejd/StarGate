package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

/**
 * 미팅 멤버 브릿지 엔티티
 */
@Entity
@Table(name = "meeting_member_bridge")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MeetingMemberBridge extends BaseEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long no;


    @ManyToOne
    @JoinColumn(name="p_member.email")
    private PMember pMember;

    @ManyToOne
    @JoinColumn(name="meeting.uuid")
    private Meeting meeting;

    @Column(name = "order_num", nullable = false)
    @ColumnDefault("0")
    private int orderNum;

}
