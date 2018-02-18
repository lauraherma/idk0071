package com.nerdware.nerdware.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.time.LocalDateTime;

public class Break {
    @Id
    @Column
    private Long breakId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;
    private Long hairdresserId;
}
