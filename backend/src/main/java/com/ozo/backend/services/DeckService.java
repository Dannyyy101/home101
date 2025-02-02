package com.ozo.backend.services;

import com.ozo.backend.dtos.CardDTO;
import com.ozo.backend.dtos.DeckDTO;
import com.ozo.backend.entitys.Card;
import com.ozo.backend.entitys.Deck;
import com.ozo.backend.mapper.CardMapper;
import com.ozo.backend.mapper.DeckMapper;
import com.ozo.backend.repositorys.mongodb.DeckRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DeckService {
    private final DeckRepository deckRepository;
    private final DeckMapper deckMapper;
    private final CardMapper cardMapper;

    public DeckService(DeckRepository deckRepository, DeckMapper deckMapper, CardMapper cardMapper) {
        this.deckRepository = deckRepository;
        this.deckMapper = deckMapper;
        this.cardMapper = cardMapper;
    }

    public void createDeck(DeckDTO deck) {
        deckRepository.save(deckMapper.mapFromDTO(deck));
    }

    public List<DeckDTO> getAllDecks() {
        return deckMapper.mapToDTOs(deckRepository.findAll());
    }

    public DeckDTO getDeckById(String deckId) {
        return deckMapper.mapToDTO(deckRepository.findById(deckId).orElseThrow());
    }

    public void addCardsToDeck(String deckId, List<CardDTO> cards) {
        Deck deck = deckRepository.findById(deckId).orElseThrow();
        deck.setCards(Stream.concat(cardMapper.mapFromToDTOs(cards.stream().toList()).stream(), deck.getCards().stream()).collect(Collectors.toSet()));
        deckRepository.save(deck);
    }
}
