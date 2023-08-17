package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.JwtToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * redis token repository
 */
@Repository
public interface JwtTokenRepository extends CrudRepository<JwtToken, String> {
}
