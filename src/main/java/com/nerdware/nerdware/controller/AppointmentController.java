package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.service.AppointmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppointmentController {

    private AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping(value = "/appointment/add", consumes = "application/json")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @GetMapping(value = "/appointment/remove/{id}")
    public Integer removeAppointment(@PathVariable("id") Long id) {
        return appointmentService.removeAppointment(id);
    }

    @GetMapping(value = "/appointments/{id}")
    public List<Appointment> getAppointmentByClientId(@PathVariable("id") long userId) {
        return appointmentService.getAppointmentsByClientId(userId);
    }

    @GetMapping(value = "/appointments")
    public List<Appointment> findAllAppointments() {
        return appointmentService.getAllAppointments();
    }



}
