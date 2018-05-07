package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Appointment;
import com.nerdware.nerdware.entity.ColorCard;
import com.nerdware.nerdware.entity.Role;
import com.nerdware.nerdware.entity.Work;
import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.repository.AppointmentRepository;
import com.nerdware.nerdware.repository.ColorCardRepository;
import com.nerdware.nerdware.repository.ColorRecipeRepository;
import com.nerdware.nerdware.repository.RoleRepository;
import com.nerdware.nerdware.repository.WorkRepository;
import com.nerdware.nerdware.repository.WorkTypeRepository;
import com.sun.deploy.util.SessionState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

        Work work = handleWork(appointment);
        Role client = roleRepository.findOne(appointment.getClient().getId());
        Role hairdresser = roleRepository.findOne(appointment.getHairdresser().getId());
        Double price = appointment.getPrice();
        LocalDateTime startTime = appointment.getStartTime();
        LocalDateTime endTime = appointment.getEndTime();
        String description = appointment.getDescription();

        if (appointment.getId() != null) {
            appointment = appointmentRepository.findOne(appointment.getId());
            appointment.setPrice(price);
            appointment.setDescription(description);
            appointment.setStartTime(startTime);
            appointment.setEndTime(endTime);
        }

        appointment.setWork(workRepository.save(work));
        appointment.setClient(client);

        if (appointment.getId() == null) {
            handleRoles(appointment, hairdresser);
        }

        return appointmentRepository.save(appointment);
    }

    private void handleRoles(Appointment appointment, Role hairdresser) {
        appointment.setHairdresser(hairdresser);
        List<Appointment> hairdresserAppointments = hairdresser.getAppointments();
        hairdresserAppointments.add(appointment);
        hairdresser.setAppointments(hairdresserAppointments);
    }

    @Transactional
    public Integer removeAppointment(Long id) {
        return appointmentRepository.removeById(id);
    }

    private Work handleWork(Appointment appointment) {
        Work work = appointment.getWork();
        List<WorkType> workTypes = work.getWorkTypes();
        List<WorkType> newWorkTypes = new ArrayList<>();
        for (WorkType workType : workTypes) {
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
        return work;
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
