package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Person;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface PersonRepository extends Repository<Person, Long> {

    Person findOne(Long id);
    Person save(Person person);
    List<Person> findAll();
}
