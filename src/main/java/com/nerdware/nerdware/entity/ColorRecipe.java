package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class ColorRecipe {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDateTime date;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Color> colors;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hydrogen> hydrogens;

    @ManyToOne
    private ColorCard colorCard;
}


