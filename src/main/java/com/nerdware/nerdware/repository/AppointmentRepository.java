package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    Appointment findOne(Long id);

    @Override
    List<Appointment> findAll();
}
