package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.MeetingFUserBridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingFUserRepository extends JpaRepository<MeetingFUserBridge, Long> {
}
