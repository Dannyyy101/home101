package com.ozo.backend.repositorys.mongodb;

import com.ozo.backend.entitys.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends MongoRepository<Document, String> {
}
