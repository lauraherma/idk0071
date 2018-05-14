package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    Appointment findOne(Long id);

    Integer removeById(Long id);

    @Override
    List<Appointment> findAll();

    @Query("select a from Appointment a where a.hairdresser = :hairdresserId")
    List<Appointment> findAppointmentsByHairdresserId(@Param("hairdresserId") long hairdresserId);

}
