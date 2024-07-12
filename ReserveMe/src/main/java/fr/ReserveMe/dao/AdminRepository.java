package fr.ReserveMe.dao;

import fr.ReserveMe.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String emailParam);
    Boolean existsByEmail(String email);

}
