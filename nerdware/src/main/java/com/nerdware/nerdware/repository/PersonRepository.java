package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface PersonRepository extends Repository<Person, Long> {

    Person findOne(Long id);
    Person save(Person person);
    List<Person> findAll();

    @Query("select Person from Role r where r.roletype.id = :roleTypeId")
    List<Person> findPersonByRole(Long roleTypeid);
}
