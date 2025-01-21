package com.ozo.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/decks")
@RestController
public class DeckController {

    @PostMapping("")
    public String createDeck(){
        return "Test";
    }
}
