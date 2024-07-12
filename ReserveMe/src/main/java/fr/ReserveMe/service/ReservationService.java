package fr.ReserveMe.service;

import fr.ReserveMe.entity.Reservation;
import fr.ReserveMe.exception.BusinessResourceException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationService {

    List<Reservation> findAllReservation() throws BusinessResourceException;

    List<Reservation> findAllReservationByRestaurantId(Long restaurantId) throws BusinessResourceException;

    Optional<Reservation> findReservationById(Long id) throws BusinessResourceException;

    Reservation saveReservation(Reservation reservation) throws BusinessResourceException;

    Reservation createReservationToRestaurant(Reservation reservation, Long id) throws BusinessResourceException;


    Reservation addReservationToRestaurant(Long restaurantId, Reservation reservation) throws BusinessResourceException;

    Reservation updateReservation(Long id, Reservation reservation) throws BusinessResourceException;


    Reservation acceptReservation(Long id) throws BusinessResourceException;

    Reservation updateReservationComplete(Long id, Reservation reservation) throws BusinessResourceException;

    @Query("SELECT r FROM Reservation r WHERE r.restaurant.id = :restaurantId AND r.status = 'en attente'")
    List<Reservation> findPendingReservationsByRestaurantId(@Param("restaurantId") Long restaurantId);

    void deleteReservation(Long id) throws BusinessResourceException;

     List<Reservation> findReservationsByRestaurantIdAndStatus(Long restaurantId, String status);
}
