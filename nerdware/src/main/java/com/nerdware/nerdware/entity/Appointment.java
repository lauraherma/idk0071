package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Appointment { 
    @Column
    private Long appointmentId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;
    private Long hairdresserId;
    private Long clientId;
    private Long workId;

}
