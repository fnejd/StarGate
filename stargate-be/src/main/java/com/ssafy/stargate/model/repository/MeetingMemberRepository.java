package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.MeetingMemberBridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface MeetingMemberRepository extends JpaRepository<MeetingMemberBridge, UUID> {
}
