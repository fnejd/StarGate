package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Polaroid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PolaroidRepository extends JpaRepository<Polaroid, Long> {
    @Query("SELECT p from Polaroid p where p.fUser.email = :email")
    Optional<List<Polaroid>> findPolaroidList(@Param("email") String fanEmail);

    @Query("SELECT p from Polaroid p where p.fUser.email = :email and p.pMember.memberNo = :memberNo and p.meeting.uuid = :uuid")
    Optional<List<Polaroid>> findPolaroidList(@Param("email") String fanEmail, @Param("memberNo") long memberNo, @Param("uuid") UUID meetingUuid);

    @Query("DELETE FROM Polaroid p WHERE p.fUser.email = :email")
    @Modifying
    void deleteAllByFUserEmail(@Param("email") String fanEmail);
}
