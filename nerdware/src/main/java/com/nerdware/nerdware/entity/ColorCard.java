package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class ColorCard {
    @Id
    @Column
    private Long colorCardId;
    private String description;
    private Long colorRecipeId;
}