package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.PGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PGroupRepository extends JpaRepository<PGroup,Long> {
    @Query("SELECT pg from PGroup pg where pg.pUser.email = :email ")
    List<PGroup> findAllByEmail(@Param("email") String email);
}
