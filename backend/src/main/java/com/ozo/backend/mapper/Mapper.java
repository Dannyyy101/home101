package com.ozo.backend.mapper;

import java.util.List;

public interface Mapper<S, T> {
    T mapToDTO(S source);

    S mapFromDTO(T target);

    default List<T> mapToDTOs(List<S> source) {
        return source.stream().map((this::mapToDTO)).toList();
    }

    default List<S> mapFromDTOs(List<T> target) {
        return target.stream().map((this::mapFromDTO)).toList();
    }
}
