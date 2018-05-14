package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.Color;
import com.nerdware.nerdware.repository.ColorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService {

    private ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }


    public List<Color> getAvailableColors() {
        return colorRepository.findAll();
    }

    public Color addColor(Color color) {
        return colorRepository.save(color);
    }

}
