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

@Entity
@Getter
@Setter
public class ColorRecipe {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "color_id")
    @ManyToOne(optional=false)
    private Color color;

    @JoinColumn(name = "hydrogen_id")
    @ManyToOne(optional=false)
    private Hydrogen hydrogen;

}

