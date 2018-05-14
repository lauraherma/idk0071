package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Hydrogen;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HydrogenRepository extends CrudRepository<Hydrogen, Long> {

    List<Hydrogen> findAll();
}

