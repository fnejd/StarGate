package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Comparator;
import java.util.List;
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
    @JoinColumn(name = "p_member.no")
    private PMember pMember;

    @ManyToOne
    @JoinColumn(name = "meeting.uuid")
    private Meeting meeting;

    @Column(name = "order_num", nullable = false)
    @ColumnDefault("0")
    private int orderNum;

    /**
     * 미팅방 id를 생성한다.
     * 미팅 uuid와 미팅멤버 uuid를 이용한다.
     *
     * @param meeting       [Meeting] 미팅
     * @param meetingMember [MeetingMemberBridge] 미팅 멤버
     * @return [String] 생성된 미팅방 id
     */
    public static String getRoomId(Meeting meeting, MeetingMemberBridge meetingMember) {
        return meeting.getUuid() + "." + meetingMember.getUuid();
    }

    /**
     * 미팅 멤버들을 orderNum값을 따라 오름차순으로 정렬해준다.
     *
     * @param meetingMembers [List<MeetingMemberBridge>] 정렬할 미팅 멤버 리스트
     */
    public static void sortMeetingMembersByOrderNum(List<MeetingMemberBridge> meetingMembers) {
        meetingMembers.sort(Comparator.comparingInt(MeetingMemberBridge::getOrderNum));
    }
}
