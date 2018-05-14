package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Hydrogen;
import com.nerdware.nerdware.repository.HydrogenRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HydrogenService {

    private HydrogenRepository hydrogenRepository;

    public HydrogenService(HydrogenRepository hydrogenRepository) {
        this.hydrogenRepository = hydrogenRepository;
    }


    public List<Hydrogen> getAvailableHydrogens() {
        return hydrogenRepository.findAll();
    }

    public Hydrogen addHydrogen(Hydrogen hydrogen) {
        return hydrogenRepository.save(hydrogen);
    }

}
