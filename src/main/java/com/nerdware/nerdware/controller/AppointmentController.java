package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {
    private AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @RequestMapping(value = "/appointments/add", method = RequestMethod.POST, consumes = "application/json")
    public Appointment addHairdresser(@RequestBody Appointment appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @RequestMapping(value = "/appointments/{id}", method= RequestMethod.GET)
    public Appointment getAppointment(@PathVariable("id") long userId) {
        return appointmentService.getAppointmentById(userId);
    }

    @RequestMapping(value = "/appointments", method = RequestMethod.GET)
    public List<Appointment> findAllAppointments() {
        return appointmentService.getAllAppointments();
    }
}
