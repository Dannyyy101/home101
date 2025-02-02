package com.ozo.backend.mapper;

import com.ozo.backend.dtos.CardDTO;
import com.ozo.backend.dtos.DocumentDTO;
import com.ozo.backend.entitys.Card;
import com.ozo.backend.entitys.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardMapper {

    public CardDTO mapToDTO(Card card) {
        return new CardDTO(card.getId(), card.getQuestion(), card.getAnswer(), card.getPerformance(), card.getLastLearned());
    }

    public Card mapFromDTO(CardDTO card) {
        return new Card(card.getId(), card.getQuestion(), card.getAnswer(), card.getPerformance(), card.getLastLearned());
    }

    public List<CardDTO> mapToDTOs(List<Card> cards) {
        return cards.stream().map((this::mapToDTO)).toList();
    }

    public List<Card> mapFromToDTOs(List<CardDTO> cards) {
        return cards.stream().map((this::mapFromDTO)).toList();
    }
}
