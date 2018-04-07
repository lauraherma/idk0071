package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.Work;
import com.nerdware.nerdware.repository.AppointmentRepository;
import com.nerdware.nerdware.repository.RoleRepository;
import com.nerdware.nerdware.repository.WorkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private AppointmentRepository appointmentRepository;
    private WorkRepository workRepository;
    private RoleRepository roleRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment addAppointment(Appointment appointment) {

        appointment.getWork().setId(1L);
        Work work = workRepository.save(appointment.getWork());
        System.out.println(work);
        appointment.setWork(work);
        appointment.setClient(roleRepository.findOne(appointment.getClient().getId()));
        appointment.setHairdresser(roleRepository.findOne(appointment.getHairdresser().getId()));

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(long id) {
        return appointmentRepository.findOne(id);
    }

}
