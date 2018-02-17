package com.nerdware.nerdware.entity;

import javax.persistence.Column;
import javax.persistence.Id;

public class WorkType {
    @Id
    @Column
    private Long workTypeId;
    private String name;
    private String description;
}
