package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.PGroup;
import com.ssafy.stargate.model.entity.PMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PMemberRepository extends JpaRepository<PMember,Long> {

    @Modifying
    @Query("DELETE from PMember pm where pm.memberNo = :memberNo")
    void deleteMemberByMemberNo(@Param("memberNo") long memberNo);
}
