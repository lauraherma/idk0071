package com.nerdware.nerdware.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

    @Column(length = 1000)
    private String description;

    @JsonIgnoreProperties({"appointments"})
    @JoinColumn(name = "hairdresser_id")
    @ManyToOne
    private Role hairdresser;

    @JsonIgnoreProperties({"appointments"})
    @JoinColumn(name = "client_id")
    @ManyToOne
    private Role client;

    @JoinColumn(name = "work_id")
    @ManyToOne(cascade = CascadeType.REFRESH)
    private Work work;

    @JoinColumn(name = "color_card_id")
    @ManyToOne(cascade = CascadeType.REFRESH)
    private ColorCard colorCard;

    private Double price;
}

