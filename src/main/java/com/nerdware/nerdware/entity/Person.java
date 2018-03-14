package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Person {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq")
    @SequenceGenerator(name = "person_seq", sequenceName = "person_seq", allocationSize = 1)
    private Long id;

    @Column(length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Pattern(regexp="^(.+)@(.+)$",
            message="{invalid.email}")
    private String email;

    private LocalDate dateOfBirth;

    @Column(length = 50)
    private String phone;

    @Column(unique=true)
    private String username;

    private String password;
}
