package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Certify;
import com.ssafy.stargate.model.entity.ChattingRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, Long> {



}
