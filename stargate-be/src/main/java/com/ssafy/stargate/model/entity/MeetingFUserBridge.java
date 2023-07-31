package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

/**
 * 미팅 팬 유저 브릿지 엔티티
 */
@Entity
@Table(name = "meeting_f_user_bridge")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class MeetingFUserBridge extends BaseEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long no;

    @Column
    private String email; // fuser

    @ManyToOne
    @JoinColumn(name="meeting.uuid")
    private Meeting meeting;

    @Column(name = "order_num", nullable = false)
    @ColumnDefault("0")
    private int orderNum;

}
