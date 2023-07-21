package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Certify;
import com.ssafy.stargate.model.entity.FUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertifyRepository extends JpaRepository<Certify, String> {
}
