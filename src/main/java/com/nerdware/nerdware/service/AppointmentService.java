package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.*;
import com.nerdware.nerdware.repository.*;
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
    private ColorRepository colorRepository;

    @Autowired
    private HydrogenRepository hydrogenRepository;

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
        List<ColorRecipe> colorRecipes = new ArrayList<>();
        for (ColorRecipe colorRecipe: colorCard.getColorRecipes()) {
            colorRepository.save(colorRecipe.getColors());
            hydrogenRepository.save(colorRecipe.getHydrogens());
            colorRecipeRepository.save(colorRecipe);
            colorRecipes.add(colorRecipe);
        }
        colorCard.setColorRecipes(colorRecipes);
        work.setColorCard(colorCardRepository.save(colorCard));
        return work;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public boolean appointmentNotExists(Long id) {
        return id == null;
    }

    public List<Appointment> getAppointmentsByClientId(long id) {
        return appointmentRepository.findAppointmentsByClientId(id);
    }

    public boolean appointmentDoesNotExist(Long id) {
        return id == null;
    }

    public ColorRecipe addColorRecipeToAppointment(long appointmentId) {
        Appointment appointment = this.appointmentRepository.findOne(appointmentId);
        Work work = appointment.getWork();

        if (appointment.getWork() == null) {
            work = workRepository.save(work);
            appointment.setWork(work);
        }

        ColorCard colorCard = work.getColorCard();

        return null;
    }
}
