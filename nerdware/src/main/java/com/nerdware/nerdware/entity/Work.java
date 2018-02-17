package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Work {
    @Id
    @Column
    private Long workId;
    private Long workTypeId;
    private Long colorCardId;
    private String description;

}
