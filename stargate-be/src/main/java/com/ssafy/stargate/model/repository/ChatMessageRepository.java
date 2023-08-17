package com.ssafy.stargate.model.repository;


import com.ssafy.stargate.model.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    Optional<List<ChatMessage>> findAllByChattingRoomRoomNo(Long roomNo);

}
