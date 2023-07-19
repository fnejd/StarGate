package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.PGroup;
import com.ssafy.stargate.model.entity.PMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PMemberRepository extends JpaRepository<PMember,Long> {
}
