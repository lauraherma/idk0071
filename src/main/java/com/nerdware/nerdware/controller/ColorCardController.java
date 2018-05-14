package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.ColorCard;
import com.nerdware.nerdware.service.ColorCardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ColorCardController {

    private ColorCardService colorCardService;

    public ColorCardController(ColorCardService colorCardService) {
        this.colorCardService = colorCardService;
    }

    @PostMapping(value = "/color-card/add", consumes = "application/json")
    public ColorCard addColorCard(@RequestBody ColorCard colorCard) {
        return colorCardService.addColorCard(colorCard);
    }

    @GetMapping(value = "/color-card/{id}")
    public ColorCard getColorCardById(@PathVariable("id") long colorCardId) {
        return colorCardService.getColorCardById(colorCardId);
    }

    @GetMapping(value = "/color-cards")
    public List<ColorCard> findAllColorCards() {
        return colorCardService.getAllColorCards();
    }

}
