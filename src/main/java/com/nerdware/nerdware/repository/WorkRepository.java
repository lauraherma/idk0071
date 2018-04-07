package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Work;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends CrudRepository<Work, Long> {

    Work findOne(Long id);

    List<Work> findAll();

}
