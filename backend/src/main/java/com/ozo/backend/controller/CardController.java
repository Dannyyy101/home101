package com.ozo.backend.controller;

import com.ozo.backend.dtos.CardDTO;
import com.ozo.backend.entitys.Card;
import com.ozo.backend.services.CardService;
import com.ozo.backend.services.PageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/cards")
@RestController
public class CardController {

    private final CardService cardService;
    private final PageService pageService;

    public CardController(CardService cardService1, PageService pageService) {
        this.cardService = cardService1;
        this.pageService = pageService;
    }

    @PostMapping("")
    public ResponseEntity<Void> createCard(@RequestBody CardDTO card) {
        cardService.createCard(card);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("")
    public Page<CardDTO> getAllCards(Pageable pageable) {
        return pageService.getPageFromList(cardService.getAllCards(), pageable);
    }

    @GetMapping("/{cardId}")
    public CardDTO getCardById(@PathVariable String cardId) {
        return cardService.getCardById(cardId);
    }

    @PutMapping("/{cardId}")
    public CardDTO getCardById(@PathVariable String cardId, @RequestBody CardDTO card) {
        return cardService.updateCardById(cardId, card);
    }
}
