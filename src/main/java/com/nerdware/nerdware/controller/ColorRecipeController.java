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

    @PostMapping(value = "/color-recipe/add", consumes = "application/json")
    public ColorRecipe addColorCard(@RequestBody ColorRecipe colorRecipe) {
        return colorRecipeService.addColorRecipe(colorRecipe);
    }

    @GetMapping(value = "/color-recipe/{id}")
    public ColorRecipe getColorCardById(@PathVariable("id") long colorRecipeId) {
        return colorRecipeService.getColorRecipeById(colorRecipeId);
    }

    @GetMapping(value = "/color-recipes")
    public List<ColorRecipe> findAllColorRecipes() {
        return colorRecipeService.getAllColorRecipes();
    }

}
