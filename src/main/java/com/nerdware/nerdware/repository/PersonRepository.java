package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> {


    Person findOne(Long id);
    @Override
    List<Person> findAll();

}
