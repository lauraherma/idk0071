package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "person_id")
    @ManyToOne(optional=false)
    private Person person;

    @JoinColumn(name = "role_type_id")
    @ManyToOne(optional=false, cascade= CascadeType.ALL)
    private RoleType roleType;

    @OneToMany
    private List<Appointment> appointments;
}
