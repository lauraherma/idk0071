package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;

    @JoinColumn(name = "hairdresser_id")
    @ManyToOne(optional=false)
    private Role hairdresser;

    @JoinColumn(name = "client_id")
    @ManyToOne(optional=false)
    private Role client;

    @JoinColumn(name = "work_id")
    @ManyToOne(optional=false)
    private Work work;
}
