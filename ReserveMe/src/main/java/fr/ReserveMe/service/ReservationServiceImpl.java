package fr.ReserveMe.service;

import fr.ReserveMe.dao.ReservationRepository;
import fr.ReserveMe.dao.MenuRepository;
import fr.ReserveMe.dao.RestaurantRepository;
import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.entity.Reservation;
import fr.ReserveMe.entity.Restaurant;
import fr.ReserveMe.exception.BusinessResourceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl extends  CrudService<Reservation, Long> implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final RestaurantRepository restaurantRepository;


    private static final Logger logger = LoggerFactory.getLogger(ReservationServiceImpl.class);

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, RestaurantRepository restaurantRepository) {
        this.reservationRepository = reservationRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    protected JpaRepository<Reservation, Long> getRepository() {
        return reservationRepository;
    }

    @Override
    protected String getEntityName() {
        return "Reservation";
    }

    @Override
    public List<Reservation> findAllReservation() throws BusinessResourceException{
        return findAll();
    }

    @Override
    public List<Reservation> findAllReservationByRestaurantId(Long restaurantId) throws BusinessResourceException {
        return reservationRepository.findByRestaurant_Id(restaurantId);
    }

    @Override
    public Optional<Reservation> findReservationById(Long id) throws BusinessResourceException {
        return findById(id);
    }


    @Override
    public Reservation saveReservation(Reservation reservation) throws BusinessResourceException {

        if (reservation.getId() != null) {
            throw new BusinessResourceException(getEntityName() + " ID must be null for creation.");
        }
        return save(reservation);
    }

    @Override
    public Reservation createReservationToRestaurant(Reservation reservation, Long restaurantId) throws BusinessResourceException {
        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantId);

        if (restaurantOptional.isEmpty()) {
            throw new BusinessResourceException("Restaurant not found for id: " + restaurantId);
        }
        Restaurant restaurant = restaurantOptional.get();
        if (reservation.getStatus() == "" || reservation.getStatus()  == null ) {
            reservation.setStatus("En attente");
        }
        reservation.setRestaurant(restaurant);
        return save(reservation);
    }

    @Override
    public Reservation addReservationToRestaurant(Long restaurantId, Reservation reservation) throws BusinessResourceException {
        Optional<Restaurant> restaurantOptional = restaurantRepository.findById(restaurantId);

        if (restaurantOptional.isPresent()) {
            Restaurant restaurant = restaurantOptional.get();
            reservation.setRestaurant(restaurant);
            return reservationRepository.save(reservation);
        } else {
            throw new BusinessResourceException("Restaurant not found with ID: " + restaurantId);
        }
    }

    public Reservation createReservationAssociate(Reservation reservation, Long restaurantId) throws BusinessResourceException {
        Optional<Restaurant> optionalRestau = restaurantRepository.findById(restaurantId);

        if (optionalRestau.isEmpty()) {
            throw new BusinessResourceException("Restaurant not found with id: " + restaurantId);
        }
        Restaurant restaurant = optionalRestau.get();
        reservation.setRestaurant(restaurant);

        return reservationRepository.save(reservation);
    }

    @Transactional
    @Override
    public Reservation updateReservation(Long id, Reservation reservation) throws BusinessResourceException {
        Optional<Reservation> existingItem = reservationRepository.findById(id);
        if (!reservationRepository.existsById(id)) {
            throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
        }
        // Mettre à jour les propriétés du Reservation existant
        Reservation existingReservation = existingItem.get();


        if (reservation.getDate() != null) {
            existingReservation.setDate(reservation.getDate());
        }

        if (reservation.getEmail() != null) {
            existingReservation.setEmail(reservation.getEmail());
        }

        if (reservation.getDateExpiration() != null) {
            existingReservation.setDateExpiration(reservation.getDateExpiration());
        }

        if (reservation.getStatus() != null) {
            existingReservation.setStatus(reservation.getStatus());
        }

        if (reservation.getGuests() != 0) {
            existingReservation.setGuests(reservation.getGuests());
        }

        if (reservation.getNotes() != null) {
            existingReservation.setNotes(reservation.getNotes());
        }

        if (reservation.getFirstname() != null) {
            existingReservation.setFirstname(reservation.getFirstname());
        }

        if (reservation.getLastname() != null) {
            existingReservation.setLastname(reservation.getLastname());
        }

        if (reservation.getPhoneNumber() != null) {
            existingReservation.setPhoneNumber(reservation.getPhoneNumber());
        }

        if (reservation.getRestaurant() != null) {
            existingReservation.setRestaurant(reservation.getRestaurant());
        }

        if (reservation.getCivilite() != null) {
            existingReservation.setCivilite(reservation.getCivilite());
        }

        // Enregistrer les modifications
        return reservationRepository.save(existingReservation);
    }



    @Transactional
    @Override
    public Reservation acceptReservation(Long id) throws BusinessResourceException {
        Optional<Reservation> existingItem = reservationRepository.findById(id);
        if (!reservationRepository.existsById(id)) {
            throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
        }
        // Mettre à jour les propriétés du Reservation existant
        Reservation existingReservation = existingItem.get();

            existingReservation.setStatus("Accepté");

        // Enregistrer les modifications
        return reservationRepository.save(existingReservation);
    }


    //    met a jour en supprimant l'association
    @Transactional(readOnly=false)
    @Override
    public Reservation updateReservationComplete(Long id, Reservation reservation) throws BusinessResourceException {
        if (!reservationRepository.existsById(id)) {
            throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
        }
        reservation.setId(id);
        return save(reservation);
    }

    @Transactional(readOnly=false)
    @Override
    public void deleteReservation(Long id) throws BusinessResourceException {
        Optional<Reservation> reservation = findById(id);
        if (reservation == null) {
            throw new BusinessResourceException("Menu not found with id: " + id);
        }
        deleteById(id);
    }

    @Override
    public List<Reservation> findPendingReservationsByRestaurantId(Long restaurantId) throws BusinessResourceException {
        List<Reservation> listReservation = reservationRepository.findPendingReservationsByRestaurantId(restaurantId);

        if (listReservation == null) {
            throw new BusinessResourceException("Reservations not found");
        }
        return listReservation;
    }

    public List<Reservation> findReservationsByRestaurantIdAndStatus(Long restaurantId, String status) {
        List<Reservation> listReservation =reservationRepository.findByRestaurantIdAndStatus(restaurantId, status);
        if (listReservation == null) {
            throw new BusinessResourceException("Reservations not found");
        }
        return listReservation;
    }

}
