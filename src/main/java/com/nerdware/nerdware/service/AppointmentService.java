package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.repository.AppointmentRepository;
import com.nerdware.nerdware.repository.WorkTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private AppointmentRepository appointmentRepository;
    private WorkTypeRepository workTypeRepository;
    private Long id = 2L;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment addAppointment(Appointment appointment) {


        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(long id) {
        return appointmentRepository.findOne(id);
    }

    public List<WorkType> getAvailableWorkTypes() {
        return workTypeRepository.findAll();
    }
}
