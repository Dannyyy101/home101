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
@org.springframework.data.mongodb.core.mapping.Document(collection = "Cards")
public class Card {
    @Id
    String id;
    String question;
    String answer;
    String performance;
    LocalDateTime lastLearned;
}
