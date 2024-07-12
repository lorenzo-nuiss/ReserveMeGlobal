package fr.ReserveMe.service;

import fr.ReserveMe.component.JwtResponse;
import fr.ReserveMe.component.UserDetailsImpl;
import fr.ReserveMe.entity.Admin;
import fr.ReserveMe.entity.SignupRequest;
import fr.ReserveMe.exception.BusinessResourceException;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    List<Admin> findAll();

    JwtResponse authenticateUser(Admin user) throws BusinessResourceException;

    void registerUser(SignupRequest SignupRequest);

    Optional<Admin> findAdminById(Long id) throws BusinessResourceException;

    Optional<Admin> findByEmail(String email) throws BusinessResourceException;

    Admin saveOrUpdateAdmin(Admin admin) throws BusinessResourceException;

    void deleteAdmin(Long id) throws BusinessResourceException;

    void changeAdminRole(Admin currentAdmin, Long adminId, float newRole) ;

    Optional<Admin> findByEmailAndPassword(String email, String password) throws BusinessResourceException;

}
