package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LetterRepository extends JpaRepository<Letter, Long> {

    List<Letter> findByMeeting_Uuid(UUID uuid);

    List<Letter> findBypMemberMemberNo(long memberNo);

    List<Letter> findByfUserEmail(String email);

}
