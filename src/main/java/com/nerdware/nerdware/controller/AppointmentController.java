package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {
    private AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping(value = "/appointments/add", consumes = "application/json")
    public Appointment addHairdresser(@RequestBody Appointment appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @GetMapping(value = "/appointments/{id}")
    public Appointment getAppointment(@PathVariable("id") long userId) {
        return appointmentService.getAppointmentById(userId);
    }

    @GetMapping(value = "/appointments")
    public List<Appointment> findAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping(value = "/appointments/workTypes")
    public List<WorkType> findAvailableWorkTypes() {
        return appointmentService.getAvailableWorkTypes();
    }
}
