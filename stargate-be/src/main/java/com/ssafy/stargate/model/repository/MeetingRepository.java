package com.ssafy.stargate.model.repository;


import com.ssafy.stargate.model.entity.Meeting;
import com.ssafy.stargate.model.entity.PGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, UUID> {
    @Query("SELECT m FROM Meeting m WHERE m.pUser.email = :email ")
    Optional<List<Meeting>> findAllByEmail(@Param("email") String email);

    @Query("SELECT m FROM Meeting m WHERE m.uuid = :uuid AND m.pUser.email = :email")
    Optional<Meeting> findByIdAndEmail(@Param("uuid") UUID uuid, @Param("email") String email);
}
