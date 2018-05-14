package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.Color;
import com.nerdware.nerdware.service.ColorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ColorController {

    private ColorService colorService;

    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping(value = "/colors")
    public List<Color> findAvailableColors() {
        return colorService.getAvailableColors();
    }

    @PostMapping(value = "/color/add")
    public Color addColor(@RequestBody Color color) {
        return colorService.addColor(color);
    }
}

