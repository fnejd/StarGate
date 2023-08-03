package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    @Query("SELECT h from History h where h.pMember.memberNo = :memberNo and h.fUser.email = :email")
    Optional<List<History>> findAllHistory(@Param("memberNo") long memberNo, @Param("email") String fanEmail);
}
