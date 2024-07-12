package fr.ReserveMe.dao;

import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
