package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Hydrogen;
import com.nerdware.nerdware.service.HydrogenService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HydrogenController {

    private HydrogenService hydrogenService;

    public HydrogenController(HydrogenService hydrogenService) {
        this.hydrogenService = hydrogenService;
    }

    @GetMapping(value = "/hydrogens")
    public List<Hydrogen> findAvailableHydrogens() {
        return hydrogenService.getAvailableHydrogens();
    }

    @PostMapping(value = "/hydrogen/add")
    public Hydrogen addHydrogen(@RequestBody Hydrogen hydrogen) {
        return hydrogenService.addHydrogen(hydrogen);
    }
}

