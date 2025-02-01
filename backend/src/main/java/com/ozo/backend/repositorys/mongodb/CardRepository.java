package com.ozo.backend.repositorys.mongodb;

import com.ozo.backend.entitys.Card;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CardRepository extends MongoRepository<Card, String> {
}
