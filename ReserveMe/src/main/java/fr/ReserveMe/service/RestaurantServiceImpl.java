package fr.ReserveMe.service;


import fr.ReserveMe.dao.ReservationRepository;
import fr.ReserveMe.dao.RestaurantRepository;
import fr.ReserveMe.entity.Restaurant;
import fr.ReserveMe.exception.BusinessResourceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RestaurantServiceImpl extends CrudService<Restaurant, Long> implements RestaurantService {



    private final RestaurantRepository restaurantRepository;

    private final ReservationRepository reservationRepository;

    private static final Logger logger = LoggerFactory.getLogger(RestaurantServiceImpl.class);

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository, ReservationRepository reservationRepository) {
        this.restaurantRepository = restaurantRepository;
        this.reservationRepository = reservationRepository;
    }


    @Override
    protected JpaRepository<Restaurant, Long> getRepository() {
        return restaurantRepository;
    }

    @Override
    protected String getEntityName() {
        return "Restaurant";
    }

    @Override
    public Optional<Restaurant> findRestaurantById(Long id) throws BusinessResourceException {
        return findById(id);
    }

    @Override
    public Restaurant saveRestaurant(Restaurant restaurant) throws BusinessResourceException {
        System.err.println("saveRest");
        System.err.println(restaurant);

        return save(restaurant);
    }

    @Transactional(readOnly=false)
    @Override
    public Restaurant updateRestaurant(Long id, Restaurant restaurant) throws BusinessResourceException {
       Optional<Restaurant> restauRepo = restaurantRepository.findById(id);
       if (!restaurantRepository.existsById(id)){
           throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
       }

       Restaurant restauR = restauRepo.get();

        if (restaurant.getName() != null) {
            restauR.setName(restaurant.getName());
        }

        if (restaurant.getLocation() != null) {
            restauR.setLocation(restaurant.getLocation());
        }

        if (restaurant.getOpeningTime() != null) {
            restauR.setOpeningTime(restaurant.getOpeningTime());
        }

        if (restaurant.getClosingTime() != null) {
            restauR.setClosingTime(restaurant.getClosingTime());
        }

        if (restaurant.getDayClose() != null) {
            restauR.setDayClose(restaurant.getDayClose());
        }

        if (restaurant.getReservations() != null) {
            restauR.setReservations(restaurant.getReservations());
        }

        return restaurantRepository.save(restauR);
//        return save(restaurant);
    }



    @Override
    public void deleteRestaurant(Long id) throws BusinessResourceException {
     deleteById(id);
    }
}
