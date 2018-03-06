package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.Person;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    Appointment findOne(Long id);
    /*@Override
    Person save(Person person);*/
    @Override
    List<Appointment> findAll();

    /*
    @Query("select Person from Role r where r.roletype.id = :roleTypeId")
    List<Person> findPersonByRole(Long roleTypeid);*/
}
