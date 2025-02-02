package com.ozo.backend.services;

import com.ozo.backend.dtos.DeckDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PageService {

    public <T> Page<T> getPageFromList(List<T> list, Pageable pageable) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int startItem = currentPage * pageSize;

        List<T> pageContent;

        if (list.isEmpty() || startItem >= list.size()) {
            return new PageImpl<>(Collections.emptyList(), pageable, list.size());
        }

        int toIndex = Math.min(startItem + pageSize, list.size());
        pageContent = list.subList(startItem, toIndex);

        return new PageImpl<>(pageContent, pageable, list.size());
    }
}
