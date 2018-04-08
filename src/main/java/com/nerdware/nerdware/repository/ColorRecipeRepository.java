package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.ColorRecipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRecipeRepository extends CrudRepository<ColorRecipe, Long> {


}
