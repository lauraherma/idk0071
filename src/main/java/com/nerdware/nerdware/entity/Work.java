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
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
public class Work {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "work_types_id")
    @OneToMany
    private List<WorkType> workTypes;

    @JoinColumn(name = "color_card_id")
    @ManyToOne(optional=false)
    private ColorCard colorCard;

    private String description;

    @Override
    public String toString() {
        return "Work{" +
                "id=" + id +
                ", workTypes=" + workTypes +
                ", colorCard=" + colorCard +
                ", description='" + description + '\'' +
                '}';
    }
}
