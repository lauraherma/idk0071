package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.service.WorkTypeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WorkTypeController {

    private WorkTypeService workTypeService;

    public WorkTypeController(WorkTypeService workTypeService) {
        this.workTypeService = workTypeService;
    }

    @GetMapping(value = "/work-types")
    public List<WorkType> findAvailableWorkTypes() {
        return workTypeService.getAvailableWorkTypes();
    }

    @PostMapping(value = "/work-type/add", consumes = "application/json")
    public WorkType addWorkType(@RequestBody WorkType workType) {
        System.out.println("here");
        return workTypeService.addWorkType(workType);
    }
}

