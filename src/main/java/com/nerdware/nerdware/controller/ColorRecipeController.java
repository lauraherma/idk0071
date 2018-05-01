package com.nerdware.nerdware.controller;

import com.nerdware.nerdware.entity.ColorRecipe;
import com.nerdware.nerdware.service.ColorRecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ColorRecipeController {

    private ColorRecipeService colorRecipeService;

    public ColorRecipeController(ColorRecipeService colorRecipeService) {
        this.colorRecipeService = colorRecipeService;
    }

    @PostMapping(value = "/colorrecipe/add", consumes = "application/json")
    public ColorRecipe addColorCard(@RequestBody ColorRecipe colorRecipe) {
        return colorRecipeService.addColorRecipe(colorRecipe);
    }

    @GetMapping(value = "/colorrecipe/{id}")
    public ColorRecipe getColorCardById(@PathVariable("id") long colorRecipeId) {
        return colorRecipeService.getColorRecipeById(colorRecipeId);
    }

    @GetMapping(value = "/colorrecipe")
    public List<ColorRecipe> findAllColorCards() {
        return colorRecipeService.getAllColorRecipes();
    }

}
