package fr.ReserveMe.service;

import fr.ReserveMe.component.JwtResponse;
import fr.ReserveMe.component.UserDetailsImpl;
import fr.ReserveMe.config.JwtUtils;
import fr.ReserveMe.dao.RoleRepository;
import fr.ReserveMe.entity.Admin;
import fr.ReserveMe.dao.AdminRepository;
import fr.ReserveMe.entity.Role;
import fr.ReserveMe.entity.SignupRequest;
import fr.ReserveMe.enums.ERole;
import fr.ReserveMe.exception.BusinessResourceException;
import org.apache.commons.collections4.IteratorUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements  AdminService{

    private static final Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AdminRepository adminRepository;


    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.adminRepository = adminRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public List<Admin> findAll() {
//        List<Admin> adminList = adminRepository.findAll();
//        return adminList;
        return IteratorUtils.toList(adminRepository.findAll().iterator());
    }

    @Override
    public JwtResponse authenticateUser(Admin user) throws BusinessResourceException{

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

        return new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles);

    } catch (BusinessResourceException ex) {
        logger.error("Login ou mot de passe incorrect", ex);
        throw new BusinessResourceException("UserNotFound", "Login ou mot de passe incorrect", HttpStatus.NOT_FOUND);
    }catch (Exception ex) {
        logger.error("Une erreur technique est survenue", ex);
        throw new BusinessResourceException("TechnicalError", "Une erreur technique est survenue", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }


    public void registerUser(SignupRequest signupRequest) {
        try {
            if (adminRepository.existsByEmail(signupRequest.getUsername())) {
                logger.error("Utilisateur deja existant");
                throw new BusinessResourceException("DuplicateValueError", "Un utilisateur existe déjà avec le compte : "+signupRequest.getEmail(), HttpStatus.CONFLICT);
            }
            // Create new user's account
            Admin admin = new Admin(
                    signupRequest.getEmail(),
                    bCryptPasswordEncoder.encode(signupRequest.getPassword()));

            Set<String> strRoles = signupRequest.getRole();
            Set<Role> roles = new HashSet<>();


            if (strRoles == null) {
                Role modRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);

                            break;
                        case "mod":
                            Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(modRole);

                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }
            admin.setRoles(roles);
            adminRepository.save(admin);
        } catch(DataIntegrityViolationException ex){
            logger.error("Utilisateur deja existant", ex);
            throw new BusinessResourceException("DuplicateValueError", "Un utilisateur existe déjà avec le compte : "+signupRequest.getEmail(), HttpStatus.CONFLICT);
        } catch(Exception ex){
            logger.error("Erreur technique de création ou de mise à jour de l'utilisateur", ex);
            throw new BusinessResourceException("SaveOrUpdateUserError", "Erreur technique de création ou de mise à jour de l'utilisateur: "+signupRequest.getEmail(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Optional<Admin> findByEmailAndPassword(String email, String password) throws BusinessResourceException {
        try {
            Optional<Admin> userFound = this.findByEmail(email);
            if (userFound.isPresent() && bCryptPasswordEncoder.matches(password, userFound.get().getPassword())) {
                return userFound;
            } else {
                throw new BusinessResourceException("UserNotFound", "Mot de passe incorrect", HttpStatus.NOT_FOUND);
            }
        } catch (BusinessResourceException ex) {
            logger.error("Login ou mot de passe incorrect", ex);
            throw new BusinessResourceException("UserNotFound", "Login ou mot de passe incorrect", HttpStatus.NOT_FOUND);
        }catch (Exception ex) {
            logger.error("Une erreur technique est survenue", ex);
            throw new BusinessResourceException("TechnicalError", "Une erreur technique est survenue", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Optional<Admin> findAdminById(Long id) throws BusinessResourceException {
        Optional<Admin> userFound = adminRepository.findById(id);
        if (Boolean.FALSE.equals(userFound.isPresent())){
            throw new BusinessResourceException("User Not Found", "Aucun utilisateur avec l'identifiant :" + id);
        }
        return userFound;
    }

    @Override
    public Optional<Admin> findByEmail(String email) throws BusinessResourceException {
        Optional<Admin> userFound = adminRepository.findByEmail(email);
        if (Boolean.FALSE.equals(userFound.isPresent())) {
            throw new BusinessResourceException("User Not Found", "L'utilisateur avec ce login n'existe pas :" + email);
        }
        return userFound;
    }

    @Override
    @Transactional(readOnly=false)
    public Admin saveOrUpdateAdmin(Admin admin) throws BusinessResourceException {
        try {
            if (Objects.isNull(admin.getId()) || admin.getId()==0 ) {
//                si il n'y a pas d'id, alors créationd un user
//                admin.setRole(3);
                admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
            } else {
//                sinon on modifie
                Optional<Admin> adminFromDB = findAdminById(admin.getId());
                if (!bCryptPasswordEncoder.matches(admin.getPassword(), adminFromDB.get().getPassword())) {
                    admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
                } else {
                    admin.setPassword(adminFromDB.get().getPassword());
                }
            }
            Admin result = adminRepository.save(admin);
            return result;
        } catch(DataIntegrityViolationException ex){
            logger.error("Utilisateur non existant", ex);
            throw new BusinessResourceException("DuplicateValueError", "Un utilisateur existe déjà avec le compte : "+admin.getEmail(), HttpStatus.CONFLICT);
        } catch (BusinessResourceException e) {
            logger.error("Utilisateur non existant", e);
            throw new BusinessResourceException("UserNotFound", "Aucun utilisateur avec l'identifiant: "+admin.getId(), HttpStatus.NOT_FOUND);
        } catch(Exception ex){
            logger.error("Erreur technique de création ou de mise à jour de l'utilisateur", ex);
            throw new BusinessResourceException("SaveOrUpdateUserError", "Erreur technique de création ou de mise à jour de l'utilisateur: "+admin.getEmail(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    @Transactional(readOnly=false)
    public void deleteAdmin(Long id) throws BusinessResourceException {
        try{
            adminRepository.deleteById(id);
        }catch(EmptyResultDataAccessException ex){
            logger.error(String.format("Aucun utilisateur n'existe avec l'identifiant: "+id, ex));
            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression de l'utilisateur avec l'identifiant: "+id, HttpStatus.NOT_FOUND);
        }catch(Exception ex){
            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression de l'utilisateur avec l'identifiant: "+id, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void changeAdminRole(Admin currentAdmin, Long adminId, float newRole) {

    }


//    @Transactional
//    public void changeAdminRole(Admin currentAdmin, Long adminId, float newRole) {
//        Optional<Admin> adminToUpdateOptional = adminRepository.findById(adminId);
//
//        if (adminToUpdateOptional.isPresent()) {
//            Admin adminToUpdate = adminToUpdateOptional.get();
//
//            // Vérifier que le rôle du currentAdmin est inferieur au rôle de l'admin à mettre à jour
//            if (currentAdmin.getRole() < adminToUpdate.getRole()) {
//                // Vérifier que le nouveau rôle est inférieur ou égal au rôle du currentAdmin
//                if (newRole >= currentAdmin.getRole()) {
//                    adminToUpdate.setRole(newRole);
//                    adminRepository.save(adminToUpdate);
//                } else {
//                    throw new IllegalStateException("Vous n'êtes pas autorisé à attribuer un rôle supérieur au vôtre.");
//                }
//            } else {
//                throw new IllegalStateException("Vous n'êtes pas autorisé à modifier les rôles des administrateurs de niveau supérieur.");
//            }
//        } else {
//            throw new EntityNotFoundException("L'administrateur avec l'ID spécifié n'a pas été trouvé.");
//        }
//    }

}
