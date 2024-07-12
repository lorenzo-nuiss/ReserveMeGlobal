package fr.ReserveMe.service;

import fr.ReserveMe.entity.Restaurant;
import fr.ReserveMe.exception.BusinessResourceException;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {

    List<Restaurant> findAll() throws BusinessResourceException;

    Optional<Restaurant> findRestaurantById(Long id) throws BusinessResourceException;

    Restaurant saveRestaurant(Restaurant admin) throws BusinessResourceException;

    Restaurant updateRestaurant(Long id, Restaurant admin) throws BusinessResourceException;

    void deleteRestaurant(Long id) throws BusinessResourceException;

}
