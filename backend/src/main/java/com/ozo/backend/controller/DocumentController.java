package com.ozo.backend.controller;

import com.ozo.backend.dtos.DocumentDTO;
import com.ozo.backend.services.DocumentService;
import com.ozo.backend.services.PageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/docs")
public class DocumentController {

    private final DocumentService documentService;
    private final PageService pageService;

    public DocumentController(DocumentService documentService, PageService pageService) {
        this.documentService = documentService;
        this.pageService = pageService;
    }

    @GetMapping("")
    public Page<DocumentDTO> getAllDocuments(Pageable pageable) {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return pageService.getPageFromList(documents, pageable);
    }

    @PostMapping("")
    public ResponseEntity<Void> createDocument(@RequestBody DocumentDTO document) {
        documentService.createDocument(document);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{documentId}")
    public DocumentDTO getDocumentById(@PathVariable String documentId) {
        return documentService.getDocumentById(Long.valueOf(documentId));
    }

    @PutMapping("/{documentId}")
    public DocumentDTO updateDocument(@PathVariable String documentId, @RequestBody DocumentDTO documentDTO) {
        return documentService.updateDocument(documentDTO);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String documentId) {
        documentService.deleteDocumentById(Long.valueOf(documentId));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
