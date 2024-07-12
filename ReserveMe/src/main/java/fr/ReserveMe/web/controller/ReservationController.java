package fr.ReserveMe.web.controller;

import fr.ReserveMe.entity.Reservation;
import fr.ReserveMe.exception.BusinessResourceException;
import fr.ReserveMe.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/admin/reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.findAllReservation();
        return ResponseEntity.ok(reservations);
    }


//    findById
    @GetMapping("/public/reservations/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationService.findReservationById(id);
        if (reservation.isPresent()) {
            return ResponseEntity.ok(reservation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //    accept reservation
    @GetMapping("/admin/reservations/accept/{id}")
    public ResponseEntity<Reservation> acceptReservationById(@PathVariable Long id) {
        Reservation updatedReservation = reservationService.acceptReservation(id);
        try {
            return ResponseEntity.ok(updatedReservation);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    //    find all by restaurant
    @GetMapping("/admin/reservations/list/{id}")
    public ResponseEntity<List<Reservation>> findAllByRestaurantId(@PathVariable Long id) {
        List<Reservation> reservations = reservationService.findAllReservationByRestaurantId(id);
        return ResponseEntity.ok(reservations);
    }

//    find all by restaurant and status
//    @GetMapping("/list/waiting/{id}")
//    public ResponseEntity<List<Reservation>> findAllByRestaurantIdAndStatus(@PathVariable Long id) {
//        List<Reservation> reservations = reservationService.findPendingReservationsByRestaurantId(id);
//        try {
//            return ResponseEntity.ok(reservations);
//        } catch (BusinessResourceException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }

    @GetMapping("/admin/reservations/list/waiting/{id}")
    public ResponseEntity<List<Reservation>> findReservationsByRestaurantIdAndStatus(@PathVariable Long id) {
        List<Reservation> reservations = reservationService.findReservationsByRestaurantIdAndStatus(id,"En attente");
        try {
            return ResponseEntity.ok(reservations);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    //    create
    @PostMapping("/public/reservations/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        Reservation createdReservation = reservationService.saveReservation(reservation);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
    }

    @PostMapping("/public/all/{id}")
    public String allAccess(@PathVariable Long id, @RequestBody Reservation reservation) {
        reservationService.createReservationToRestaurant(reservation, id);
        return "Public Content TEST SUCCESS." + id;
    }
    @GetMapping("/public/all/test/{id}")
    public String allAccess(@PathVariable Long id) {

        return "Public Content TEST SUCCESS." + id;
    }



    //    create with restaurant id
    @PostMapping("/public/reservations/create/{restaurantId}")
    public ResponseEntity<Reservation> createReservationForRestaurant(
            @PathVariable Long restaurantId,
            @Valid
            @RequestBody Reservation reservation) {

        try {
            Reservation createdReservation = reservationService.createReservationToRestaurant(reservation, restaurantId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
        } catch (Exception e) {
            // Gérez l'exception appropriée ici.s
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //    add with link Restaurant
    @PostMapping("/public/reservations/add/{id}")
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation, @PathVariable Long id) {
        Reservation createdReservation = reservationService.addReservationToRestaurant(id,reservation);
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/public/reservations/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
            try {
                return ResponseEntity.ok(updatedReservation);
            } catch (BusinessResourceException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
    }

    @DeleteMapping("/public/reservations/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.noContent().build();
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
