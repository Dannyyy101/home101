package com.ozo.backend.repositorys;

import com.ozo.backend.entitys.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface DocumentRepository extends CrudRepository<Document, Long> {
}
