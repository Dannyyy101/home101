package com.ozo.backend.services;

import com.ozo.backend.dtos.DocumentDTO;
import com.ozo.backend.entitys.Document;
import com.ozo.backend.mapper.DocumentMapper;
import com.ozo.backend.repositorys.mongodb.DocumentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;

    public DocumentService(DocumentRepository documentRepository, DocumentMapper documentMapper) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
    }

    public void createDocument(DocumentDTO document) {
        LocalDateTime localDateTime = LocalDateTime.now();
        document.setCreated(localDateTime);
        document.setUpdated(localDateTime);
        documentRepository.save(documentMapper.mapFromDTO(document));
    }

    public List<DocumentDTO> getAllDocuments() {
        return documentMapper.mapToDTOs(documentRepository.findAll());
    }

    public DocumentDTO updateDocument(DocumentDTO documentDTO) {
        Document document = documentRepository.findById(documentDTO.getId()).orElseThrow();
        document.setTitle(documentDTO.getTitle());
        document.setContent(documentDTO.getContent());
        document.setUpdated(LocalDateTime.now());
        return documentMapper.mapToDTO(documentRepository.save(document));
    }

    public DocumentDTO getDocumentById(String documentId) {
        return documentMapper.mapToDTO(documentRepository.findById(documentId).orElseThrow());
    }

    public void deleteDocumentById(String documentId) {
        documentRepository.deleteById(documentId);
    }

    public List<DocumentDTO> filterDocuments(List<DocumentDTO> documents, String filter) {
        // TODO make deep search
        return documents.stream().filter((documentDTO -> documentDTO.getTitle().toLowerCase().contains(filter.toLowerCase()))).toList();
    }
}
