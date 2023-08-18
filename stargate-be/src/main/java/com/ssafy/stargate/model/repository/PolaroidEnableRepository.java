package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.PolaroidEnable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * redis repository
 */
@Repository
public interface PolaroidEnableRepository extends CrudRepository<PolaroidEnable, String> {
}
