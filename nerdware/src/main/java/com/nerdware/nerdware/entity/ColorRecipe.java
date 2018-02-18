package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class ColorRecipe {
    @Id
    @Column
    private Long colorRecipeId;
    private Long colorId;
    private Long hydrogenId;

}

