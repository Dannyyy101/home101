package com.ozo.backend.mapper;

import com.ozo.backend.dtos.DocumentDTO;
import com.ozo.backend.entitys.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentMapper {


    public DocumentDTO mapToDTO(Document document) {
        return new DocumentDTO(document.getId(), document.getTitle(), document.getContent(), document.getCreated(), document.getUpdated());
    }

    public Document mapFromDTO(DocumentDTO document) {
        return new Document(document.getId(), document.getTitle(), document.getContent(), document.getCreated(), document.getUpdated());
    }

    public List<DocumentDTO> mapToDTOs(List<Document> documents) {
        return documents.stream().map((this::mapToDTO)).toList();
    }

    public List<Document> fromToDTOs(List<DocumentDTO> documents) {
        return documents.stream().map((this::mapFromDTO)).toList();
    }

}
