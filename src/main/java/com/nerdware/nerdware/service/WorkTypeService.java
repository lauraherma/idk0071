package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.WorkType;
import com.nerdware.nerdware.repository.WorkTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkTypeService {

    private WorkTypeRepository workTypeRepository;

    public WorkTypeService(WorkTypeRepository workTypeRepository) {
        this.workTypeRepository = workTypeRepository;
    }

    public List<WorkType> getAvailableWorkTypes() {
        return workTypeRepository.findAll();
    }

}
