package com.ozo.backend.mapper;

import java.util.List;

public interface Mapper {

    <T> T mapToDTO(T obj);

    <T> T mapFromDTO(T obj);

    <T> List<T> mapToDTOs(List<T> objs);

    <T> List<T> mapFromDTOs(List<T> objs);
}
