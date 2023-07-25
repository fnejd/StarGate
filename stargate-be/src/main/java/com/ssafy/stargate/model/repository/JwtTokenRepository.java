package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.JwtToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JwtTokenRepository extends JpaRepository<JwtToken, String> {


}
