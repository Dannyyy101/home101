package com.ozo.backend.entitys;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

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
}
