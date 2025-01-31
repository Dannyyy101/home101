package com.ozo.backend.entitys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@org.springframework.data.mongodb.core.mapping.Document(collection = "Documents")
public class Document {

    @Id
    private String id;
    private String title;
    private String content;
    private LocalDateTime created;
    private LocalDateTime updated;
}
