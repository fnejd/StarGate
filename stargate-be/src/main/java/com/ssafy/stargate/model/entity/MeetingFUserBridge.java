package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Comparator;
import java.util.List;

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
    @JoinColumn(name = "meeting.uuid")
    private Meeting meeting;

    @Column(name = "order_num", nullable = false)
    @ColumnDefault("0")
    private int orderNum;

    /**
     * 미팅 팬유저들을 orderNum값을 따라 오름차순으로 정렬해준다.
     *
     * @param meetingFUsers [List<MeetingFUserBridge>] 정렬할 미팅 팬유저 리스트
     */
    public static void sortMeetingFUsersByOrderNum(List<MeetingFUserBridge> meetingFUsers) {
        meetingFUsers.sort(Comparator.comparingInt(MeetingFUserBridge::getOrderNum));
    }
}
