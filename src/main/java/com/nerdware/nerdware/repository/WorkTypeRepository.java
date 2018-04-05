package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.WorkType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkTypeRepository extends CrudRepository<WorkType, Long> {

    List<WorkType> findAll();
}

