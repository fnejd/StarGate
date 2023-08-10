package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.MeetingFUserBridge;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingFUserRepository extends JpaRepository<MeetingFUserBridge, Long> {
    Optional<List<MeetingFUserBridge>> findByEmail(String email);

    @Query("SELECT mub from MeetingFUserBridge mub where mub.email = :email and mub.meeting.uuid = :uuid")
    Optional<MeetingFUserBridge> findByEmailAndUuid(@Param("email") String fanEmail, @Param("uuid") UUID meetingUuid);
}