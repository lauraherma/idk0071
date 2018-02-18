package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Hydrogen {
    @Id
    @Column
    private Long id;
    private Integer type;
    private Double am;

}
