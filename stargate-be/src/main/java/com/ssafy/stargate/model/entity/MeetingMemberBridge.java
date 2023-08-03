package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.UUID;

/**
 * 미팅 멤버 브릿지 엔티티
 */
@Entity
@Table(name = "meeting_member_bridge")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class MeetingMemberBridge extends BaseEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name="p_member.no")
    private PMember pMember;

    @ManyToOne
    @JoinColumn(name="meeting.uuid")
    private Meeting meeting;

    @Column(name = "order_num", nullable = false)
    @ColumnDefault("0")
    private int orderNum;

}
