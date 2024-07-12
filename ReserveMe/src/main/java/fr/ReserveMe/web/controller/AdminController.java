package fr.ReserveMe.web.controller;
import fr.ReserveMe.component.JwtResponse;
import fr.ReserveMe.component.UserDetailsImpl;
import fr.ReserveMe.entity.Admin;
import fr.ReserveMe.entity.SignupRequest;
import fr.ReserveMe.exception.BusinessResourceException;
import fr.ReserveMe.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

//    findById
    @GetMapping("/user/find/{userId}")
    public Optional<Admin> findUserById (@PathVariable Long userId) throws BusinessResourceException {
        return adminService.findAdminById(userId);
    }

    @GetMapping(value = "/admin/user/all")
    public ResponseEntity<List<Admin>> findAll2() {
        List<Admin> users = adminService.findAll();
        return new ResponseEntity<List<Admin>>(users, HttpStatus.FOUND);
    }

    @GetMapping("/admin/user/list")
    public List<Admin> findAll(){
        return adminService.findAll();
    }

    @PostMapping(value = "/admin/user/create")
    public ResponseEntity<Admin> saveUser(@RequestBody Admin admin) throws BusinessResourceException {
       Admin adminSaved = adminService.saveOrUpdateAdmin(admin);
        return new ResponseEntity<Admin>(adminSaved, HttpStatus.CREATED);
    }

    @PutMapping(value = "/admin/user/update")
    public ResponseEntity<Admin> updateUser(@RequestBody Admin admin) throws BusinessResourceException {
        Admin adminUpdated = adminService.saveOrUpdateAdmin(admin);
        return new ResponseEntity<Admin>(adminUpdated, HttpStatus.OK);
    }

    @DeleteMapping(value = "/admin/user/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam(value = "id", required = true) Long id) throws BusinessResourceException {
        adminService.deleteAdmin(id);
        return new ResponseEntity<Void>(HttpStatus.GONE);
    }

//    @PostMapping(value = "/login")
//    public ResponseEntity<Admin> findUserByLoginAndPassword(@RequestBody Admin user) throws BusinessResourceException {
//
//        Optional<Admin> userFound = adminService.findByEmailAndPassword(user.getEmail(), user.getPassword());
//        if (userFound.isPresent()) {
//            return new ResponseEntity<>(userFound.get(), HttpStatus.FOUND);
//        } else {
//            // L'utilisateur n'a pas été trouvé, renvoyer une réponse 404 Not Found
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody Admin user) {
        System.err.println("test");

        JwtResponse jwt = adminService.authenticateUser(user);
        return ResponseEntity.ok(jwt);
    }


//    public ResponseEntity<?> registerUser(@Valid @RequestBody Admin admin) {
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest SignupRequest) {
        System.err.println("test");
        adminService.registerUser(SignupRequest);
        return ResponseEntity.ok(HttpStatus.CREATED );
    }
}

