package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.ColorCard;
import com.nerdware.nerdware.entity.Work;
import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.repository.AppointmentRepository;
import com.nerdware.nerdware.repository.ColorCardRepository;
import com.nerdware.nerdware.repository.ColorRecipeRepository;
import com.nerdware.nerdware.repository.RoleRepository;
import com.nerdware.nerdware.repository.WorkRepository;
import com.nerdware.nerdware.repository.WorkTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private WorkTypeRepository workTypeRepository;

    @Autowired
    private ColorCardRepository colorCardRepository;

    @Autowired
    private ColorRecipeRepository colorRecipeRepository;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private RoleRepository roleRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment addAppointment(Appointment appointment) {

        Work work = appointment.getWork();
        List<WorkType> workTypes = work.getWorkTypes();
        List<WorkType> newWorkTypes = new ArrayList<>();
        for (WorkType workType: workTypes) {
            if (appointmentNotExists(workType.getId())) {
                newWorkTypes.add(workTypeRepository.save(workType));
            } else {
                newWorkTypes.add(workType);
            }
        }
        work.setWorkTypes(newWorkTypes);
        ColorCard colorCard = work.getColorCard();
        colorCard.setColorRecipe(colorRecipeRepository.save(colorCard.getColorRecipe()));
        work.setColorCard(colorCardRepository.save(colorCard));
        appointment.setWork(workRepository.save(work));
        appointment.setClient(roleRepository.findOne(appointment.getClient().getId()));
        appointment.setHairdresser(roleRepository.findOne(appointment.getHairdresser().getId()));

        List<Appointment> hairdresserAppointments = appointment.getHairdresser().getAppointments();
        hairdresserAppointments.add(appointment);
        appointment.getHairdresser().setAppointments(hairdresserAppointments);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public boolean appointmentNotExists(Long id) {
        return id == null;
    }

    public List<Appointment> getAppointmentsByHairdresserId(long id) {
        return appointmentRepository.findAppointmentsByHairdresserId(id);
    }

}
