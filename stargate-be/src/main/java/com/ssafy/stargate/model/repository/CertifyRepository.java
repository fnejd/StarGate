package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Certify;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CertifyRepository extends JpaRepository<Certify, String>{

    Optional<Certify> findByfUserEmail(String email);
}

