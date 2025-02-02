package com.ozo.backend.controller;

import com.ozo.backend.dtos.CardDTO;
import com.ozo.backend.dtos.DeckDTO;
import com.ozo.backend.services.DeckService;
import com.ozo.backend.services.PageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/decks")
@RestController
public class DeckController {

    private final DeckService deckService;
    private final PageService pageService;

    public DeckController(DeckService deckService, PageService pageService) {
        this.deckService = deckService;
        this.pageService = pageService;
    }

    @PostMapping("")
    public ResponseEntity<Void> createDeck(@RequestBody DeckDTO deck) {
        deckService.createDeck(deck);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("")
    public Page<DeckDTO> getAllDecks(Pageable pageable) {
        return pageService.getPageFromList(deckService.getAllDecks(), pageable);
    }

    @GetMapping("/{deckId}")
    public DeckDTO getDeckById(@PathVariable String deckId) {
        return deckService.getDeckById(deckId);
    }

    @PostMapping("/{deckId}/cards")
    public ResponseEntity<Void> addCardsToDeck(@PathVariable String deckId, @RequestBody List<CardDTO> cards) {
        deckService.addCardsToDeck(deckId, cards);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
