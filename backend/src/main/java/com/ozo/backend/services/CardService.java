package com.ozo.backend.services;

import com.ozo.backend.dtos.CardDTO;
import com.ozo.backend.entitys.Card;
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

    public CardDTO updateCardById(String cardId, CardDTO card) {
        Card cardDB = cardRepository.findById(cardId).orElseThrow();
        if(card.getAnswer() != null){
            cardDB.setAnswer(card.getAnswer());
        }
        if(card.getQuestion() != null){
            cardDB.setQuestion(card.getQuestion());
        }
        if(card.getPerformance() != null){
            cardDB.setPerformance(card.getPerformance());
        }
        if(card.getLastLearned() != null){
            cardDB.setLastLearned(card.getLastLearned());
        }
        return cardMapper.mapToDTO(cardRepository.save(cardDB));
    }
}
