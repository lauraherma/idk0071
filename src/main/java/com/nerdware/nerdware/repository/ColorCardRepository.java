package com.nerdware.nerdware.repository;

import com.nerdware.nerdware.entity.ColorCard;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorCardRepository extends CrudRepository<ColorCard, Long> {


}
