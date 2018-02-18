package com.nerdware.nerdware.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Role {
    @Id
    @Column
    private Long roleId;
    private Long personId;
    private Integer roleTypeId;

}
