package com.ozo.backend.dtos;

import com.ozo.backend.entitys.Card;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeckDTO {
    String id;
    String name;
    Set<Card> cards;
}
