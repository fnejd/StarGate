package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.MeetingMemberBridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface MeetingMemberRepository extends JpaRepository<MeetingMemberBridge, UUID> {

    Optional<List<MeetingMemberBridge>> findByUuid(UUID uuid);

    @Query("SELECT mmb from MeetingMemberBridge mmb where mmb.pMember.memberNo = :member_no and mmb.meeting.uuid = :uuid order by mmb.orderNum")
    Optional<MeetingMemberBridge> findByMemberNoAndUuid(@Param("member_no") Long memberNo, @Param("uuid") UUID meetingUuid);

    @Query("SELECT mmb.pMember.memberNo FROM MeetingMemberBridge mmb WHERE mmb.uuid = :uuid")
    long getMemberNoById(@Param("uuid") UUID meetingMemberBridgeUuid);
}
