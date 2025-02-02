package com.ozo.backend.repositorys.mongodb;

import com.ozo.backend.entitys.Deck;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeckRepository extends MongoRepository<Deck, String> {
}
