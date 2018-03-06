package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private AppointmentRepository appointmentRepository;
    private Long id = 2L;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment addAppointment(Appointment appointment) {
        // siia kõik setterid person.set..

        /*person.setId(id++);
        person.setFirstName(person.getFirstName());
        person.setLastName(person.getLastName());
        person.setDateOfBirth(person.getDateOfBirth());
        person.setEmail(person.getEmail());
        person.setPhone(person.getPhone());*/

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(long id) {
        return appointmentRepository.findOne(id);
    }
}
