package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 미팅 엔티티
 */
@Entity
@Table(name = "meeting")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Meeting extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private String name;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "waiting_time", nullable = false)
    @ColumnDefault("10")
    private int waitingTime;

    @Column(name = "meeting_time", nullable = false)
    @ColumnDefault("120")
    private int meetingTime;

    @Column
    private String notice;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int photoNum;

    @Column
    private String image;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private PUser pUser;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    @Builder.Default
    private List<MeetingMemberBridge> meetingMembers = new ArrayList<>();


    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    @Builder.Default
    private List<MeetingFUserBridge> meetingFUsers = new ArrayList<>();

    @OneToMany(mappedBy = "meeting")
    @Builder.Default
    private List<Letter> letters = new ArrayList<>();

    /**
     * 미팅의 각 미팅 멤버/팬유저들을 orderNum값을 따라 오름차순으로 정렬해준다.
     *
     * @param meeting 정렬할 미팅 엔티티
     */
    public static void sortMeetingByOrderNum(Meeting meeting) {
        MeetingMemberBridge.sortMeetingMembersByOrderNum(meeting.getMeetingMembers());
        MeetingFUserBridge.sortMeetingFUsersByOrderNum(meeting.getMeetingFUsers());
    }
}
