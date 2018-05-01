package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.ColorRecipe;
import com.nerdware.nerdware.repository.ColorRecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorRecipeService {
    private ColorRecipeRepository colorRecipeRepository;

    public ColorRecipeService(ColorRecipeRepository colorRecipeRepository) {
        this.colorRecipeRepository = colorRecipeRepository;
    }

    public ColorRecipe addColorRecipe(ColorRecipe colorRecipe) {
        return colorRecipeRepository.save(colorRecipe);
    }

    public ColorRecipe getColorRecipeById(long id) {
        return colorRecipeRepository.findOne(id);
    }

    public List<ColorRecipe> getAllColorRecipes() {
        return (List<ColorRecipe>) colorRecipeRepository.findAll();
    }
}
