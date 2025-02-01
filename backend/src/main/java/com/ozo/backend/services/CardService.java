package com.ozo.backend.services;

import com.ozo.backend.dtos.CardDTO;
import com.ozo.backend.mapper.CardMapper;
import com.ozo.backend.repositorys.mongodb.CardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;

    public CardService(CardRepository cardRepository, CardMapper cardMapper) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
    }

    public void createCard(CardDTO card) {
        cardRepository.save(cardMapper.mapFromDTO(card));
    }

    public List<CardDTO> getAllCards() {
        return cardMapper.mapToDTOs(cardRepository.findAll());
    }

    public CardDTO getCardById(String cardId) {
        return cardMapper.mapToDTO(cardRepository.findById(cardId).orElseThrow());
    }
}
