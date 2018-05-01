package com.nerdware.nerdware.service;

import com.nerdware.nerdware.entity.ColorCard;
import com.nerdware.nerdware.repository.ColorCardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorCardService {
    private ColorCardRepository colorCardRepository;

    public ColorCardService(ColorCardRepository colorCardRepository) {
        this.colorCardRepository = colorCardRepository;
    }

    public ColorCard addColorCard(ColorCard colorCard) {
        return colorCardRepository.save(colorCard);
    }

    public ColorCard getColorCardById(long id) {
        return colorCardRepository.findOne(id);
    }

    public List<ColorCard> getAllColorCards() {
        return (List<ColorCard>) colorCardRepository.findAll();
    }
}
