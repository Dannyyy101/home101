package com.ozo.backend.mapper;

import com.ozo.backend.dtos.DeckDTO;
import com.ozo.backend.entitys.Deck;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeckMapper implements Mapper<Deck, DeckDTO> {

    @Override
    public DeckDTO mapToDTO(Deck source) {
        return new DeckDTO(source.getId(), source.getName(), source.getCards());
    }

    @Override
    public Deck mapFromDTO(DeckDTO target) {
        return new Deck(target.getId(), target.getName(), target.getCards());
    }

    @Override
    public List<DeckDTO> mapToDTOs(List<Deck> source) {
        return source.stream().map((this::mapToDTO)).toList();
    }

    @Override
    public List<Deck> mapFromDTOs(List<DeckDTO> target) {
        return target.stream().map((this::mapFromDTO)).toList();
    }
}
