package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Letter;
import com.ssafy.stargate.model.entity.Polaroid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {

    Optional<List<Letter>> findByMeeting_Uuid(UUID uuid);

    Optional<List<Letter>> findBypMemberMemberNo(Long memberNo);

    Optional<List<Letter>> findByfUserEmail(String email);

    @Query("SELECT l from Letter l where l.fUser.email = :email and l.pMember.memberNo = :memberNo and l.meeting.uuid = :uuid")
    Optional<Letter> findLetter(@Param("email") String fanEmail, @Param("memberNo") long memberNo, @Param("uuid") UUID meetingUuid);
}
