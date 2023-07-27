package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Postit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PostitRepository extends JpaRepository<Postit, Long> {

    @Query("SELECT p from Postit p where p.fUser.email = :email and p.pMember.memberNo = :memberNo and p.meeting.uuid = :uuid")
    Optional<Postit> findPostit(@Param("email") String fanEmail, @Param("memberNo") long memberNo, @Param("uuid") UUID meetingUuid);

}
