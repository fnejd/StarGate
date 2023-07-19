package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.PUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PUserRepository extends JpaRepository<PUser,String> {

}
