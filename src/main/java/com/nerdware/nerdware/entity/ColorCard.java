package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class ColorCard {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JoinColumn(name = "color_recipe_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ColorRecipe> colorRecipes;

}

