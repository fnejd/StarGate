package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {

    Optional<List<Letter>> findByMeeting_Uuid(UUID uuid);

    Optional<List<Letter>> findBypMemberMemberNo(long memberNo);

    Optional<List<Letter>> findByfUserEmail(String email);

}
