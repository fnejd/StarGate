package com.ssafy.stargate.model.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "chat_message")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ChatMessage extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long no;

    @Column
    private String email;

    @Column
    private String nickname;

    @Column
    private String message;

    @ManyToOne
    @JoinColumn(name = "room_no")
    private ChattingRoom chattingRoom;


}
