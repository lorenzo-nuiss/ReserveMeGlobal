package fr.ReserveMe.dao;

import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.entity.Reservation;
import fr.ReserveMe.exception.BusinessResourceException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRestaurant_Id(Long restaurantId) throws BusinessResourceException;
    List<Reservation> findPendingReservationsByRestaurantId(Long restaurantId);
    List<Reservation> findByRestaurantIdAndStatus(Long restaurantId, String status);
}
