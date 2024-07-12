package fr.ReserveMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.ReserveMe.enums.Civilite;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Data
@NoArgsConstructor
public class Reservation extends BaseEntity implements Serializable {

    private ZonedDateTime date;
    @Column(unique = false)
    private LocalDate dateExpiration = LocalDate.now().plusYears(2);
    private String status;
    private int guests;
    private String notes;

    private String firstname;

    private String lastname;

    private String phoneNumber;

    private String email;


    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @Enumerated(EnumType.STRING)
    private Civilite civilite;

    public Reservation(ZonedDateTime date, int guests, String firstname, String lastname, String phoneNumber) {
        this.date = date;
        this.guests = guests;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
    }

    public Reservation(ZonedDateTime date, String status, int guests, String firstname, String lastname, String phoneNumber, Restaurant restaurant) {
        this.date = date;
        this.status = status;
        this.guests = guests;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.restaurant = restaurant;
    }

    public Reservation(ZonedDateTime date, int guests, String notes, String firstname, String lastname, String phoneNumber, String email, Restaurant restaurant, Civilite civilite) {
        this.date = date;
        this.guests = guests;
        this.notes = notes;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.restaurant = restaurant;
        this.civilite = civilite;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public LocalDate getDateExpiration() {
        return dateExpiration;
    }

    public void setDateExpiration(LocalDate dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Civilite getCivilite() {
        return civilite;
    }

    public void setCivilite(Civilite civilite) {
        this.civilite = civilite;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
