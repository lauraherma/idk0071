package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@Getter
@Setter
public class Work {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany
    @JoinTable(
            name="work_work_type",
            joinColumns=@JoinColumn(name="work_id", referencedColumnName="id"),
            inverseJoinColumns=@JoinColumn(name="work_type_id", referencedColumnName="id"))
    private List<WorkType> workTypes;

    @JoinColumn(name = "color_card_id")
    @ManyToOne(optional=true)
    private ColorCard colorCard;

    private String description;

}
