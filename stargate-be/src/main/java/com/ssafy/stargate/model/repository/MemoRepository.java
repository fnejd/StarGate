package com.ssafy.stargate.model.repository;

import com.ssafy.stargate.model.entity.Memo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * redis repository
 */
@Repository
public interface MemoRepository extends CrudRepository<Memo, String> {
}
