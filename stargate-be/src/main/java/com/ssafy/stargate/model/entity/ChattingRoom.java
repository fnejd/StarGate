package com.ssafy.stargate.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chatting_room")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ChattingRoom extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "room_no")
    private Long roomNo;

    @Column
    private String name;

    @OneToMany(mappedBy = "chattingRoom")
    @Builder.Default
    private List<ChatMessage> messageList = new ArrayList<>();

}
