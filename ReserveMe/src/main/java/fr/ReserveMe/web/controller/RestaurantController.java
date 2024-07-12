package fr.ReserveMe.web.controller;

import fr.ReserveMe.entity.Restaurant;
import fr.ReserveMe.exception.BusinessResourceException;
import fr.ReserveMe.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }


    @GetMapping("/admin/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.findAll();
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/public/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) throws BusinessResourceException {
        Optional<Restaurant> restaurant = restaurantService.findRestaurantById(id);
        try {

            if (restaurant.isPresent()) {
            return ResponseEntity.ok(restaurant.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @PostMapping("/admin/restaurants/create")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) throws BusinessResourceException  {
        try {
            Restaurant createdRestaurant = restaurantService.saveRestaurant(restaurant);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRestaurant);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/test")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content !!!!! ";
    }

    @PutMapping("/admin/restaurants/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurant) throws BusinessResourceException {
       try {

        Restaurant updatedRestaurant = restaurantService.updateRestaurant(id, restaurant);
        if (updatedRestaurant != null) {
            return ResponseEntity.ok(updatedRestaurant);
        } else {
            return ResponseEntity.notFound().build();
        }
       } catch (BusinessResourceException e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
    }

    @DeleteMapping("/admin/restaurants/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) throws BusinessResourceException  {
        try {
            restaurantService.deleteRestaurant(id);
            return ResponseEntity.noContent().build();
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
