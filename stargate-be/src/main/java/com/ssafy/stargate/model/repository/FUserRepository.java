package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.FUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 팬 유저 레포지토리
 */
@Repository
public interface FUserRepository extends JpaRepository<FUser, String> {

    Optional<FUser> findByName(String name);

    Optional<FUser> findByNameAndPhone(String name, String phone);
}
