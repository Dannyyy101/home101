package com.ozo.backend.services;

import com.ozo.backend.dtos.DocumentDTO;
import com.ozo.backend.entitys.Document;
import com.ozo.backend.mapper.DocumentMapper;
import com.ozo.backend.repositorys.DocumentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
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
        return documentMapper.mapToDTOs((List<Document>) documentRepository.findAll());
    }

    public DocumentDTO updateDocument(DocumentDTO documentDTO) {
        Document document = documentRepository.findById(documentDTO.getId()).orElseThrow();
        document.setContent(documentDTO.getContent());
        document.setUpdated(LocalDateTime.now());
        return documentMapper.mapToDTO(documentRepository.save(document));
    }

    public DocumentDTO getDocumentById(Long documentId) {
        return documentMapper.mapToDTO(documentRepository.findById(documentId).orElseThrow());
    }

    public void deleteDocumentById(Long documentId) {
        documentRepository.deleteById(documentId);
    }
}
