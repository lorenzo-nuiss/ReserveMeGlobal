package fr.ReserveMe;
import fr.ReserveMe.entity.Admin;
import fr.ReserveMe.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class RestServices {

    private static final Logger logger = LoggerFactory.getLogger(RestServices.class);
    private AdminService adminService;

    @GetMapping(value = "/test")
    public ResponseEntity<String> pong()
    {
        System.out.println("dans le truc");
        logger.info("Démarrage des services OK .....");
        return new ResponseEntity<String>("Réponse du serveur: "+HttpStatus.OK.name(), HttpStatus.OK);
    }

    @PostMapping(value = "/createUsers")
    public ResponseEntity<Admin> saveUser(@RequestBody Admin admin) throws Exception {
        System.out.println("bien dans le create");
        System.out.println(admin);
        System.out.println("----------------");

//        Admin adminSaved = adminService.saveOrUpdateAdmin(admin);
        return new ResponseEntity<Admin>(adminService.saveOrUpdateAdmin(admin), HttpStatus.CREATED);
    }
}