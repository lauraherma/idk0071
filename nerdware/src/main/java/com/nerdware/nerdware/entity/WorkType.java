package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class WorkType {
    @Id
    @Column
    private Long workTypeId;
    private String name;
    private String description;
}
