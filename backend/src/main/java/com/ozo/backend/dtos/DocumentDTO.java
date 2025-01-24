package com.ozo.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DocumentDTO {
    private Long id;
    private String content;
    private LocalDateTime created;
    private LocalDateTime updated;
}
