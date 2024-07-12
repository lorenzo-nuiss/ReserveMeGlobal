package fr.ReserveMe.tests.integrationtest;

import fr.ReserveMe.entity.Admin;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.net.URI;
import java.util.Collection;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;
    private static final String URL = "http://localhost:8080";// url du serveur REST. Cette url peut être celle d'un //
    // serveur distant

    private String getURLWithPort(String uri) {
        return URL + uri;
    }

    @Test
    public void testFindAllAdmins() throws Exception {

        ResponseEntity<Object> responseEntity = restTemplate
                .getForEntity(getURLWithPort("/user/all"), Object.class);
        assertNotNull(responseEntity);
        @SuppressWarnings("unchecked")
        Collection<Admin> userCollections = (Collection<Admin>) responseEntity.getBody();
        assertEquals("Réponse inattendue", HttpStatus.FOUND.value(), responseEntity.getStatusCodeValue());
        assertNotNull(userCollections);
//        assertEquals(4, userCollections.size());
        // on a bien 3 utilisateurs initialisés par les scripts data.sql + un nouvel
        // utilisateur crée dans testSaveAdmin
    }

    @Test
    public void testSaveAdmin() throws Exception {

        Admin user = new Admin("PIPO", "newPassword", 1);
        Admin user2 = new Admin("admin@admin.com", "admin", 1);

        ResponseEntity<Admin> userEntitySaved = restTemplate
                .postForEntity(getURLWithPort("/user/create"), user2, Admin.class);
        assertNotNull(userEntitySaved);
        // On vérifie le code de réponse HTTP est celui attendu
        assertEquals("Réponse inattendue", HttpStatus.CREATED.value(), userEntitySaved.getStatusCodeValue());
        Admin userSaved = userEntitySaved.getBody();
        assertNotNull(userSaved);
        assertEquals(user2.getEmail(), userSaved.getEmail());
    }

    @Test
    public void testFindByEmailAndPassword() throws Exception {

        Admin userTofindByEmailAndPassword = new Admin("admin@admin.com", "admin", 1);
        ResponseEntity<Admin> responseEntity = restTemplate.postForEntity(
                getURLWithPort("/user/login"), userTofindByEmailAndPassword, Admin.class);
        assertNotNull(responseEntity);
        Admin userFound = responseEntity.getBody();

        assertEquals("Réponse inattendue", HttpStatus.FOUND.value(), responseEntity.getStatusCodeValue());
        assertNotNull(userFound);
        assertEquals(1, userFound.getId());
    }

    @Test
    public void testFindByEmailAndPassword_notFound() throws Exception {

        Admin userTofindByEmailAndPassword = new Admin("unknowAdmin", "password3", 3);
        ResponseEntity<Admin> responseEntity = restTemplate.postForEntity(
                getURLWithPort("/user/login"), userTofindByEmailAndPassword, Admin.class);
        assertNotNull(responseEntity);
        assertEquals("Réponse inattendue", HttpStatus.NOT_FOUND.value(), responseEntity.getStatusCodeValue());
    }

    @Test
    public void testUpdateAdmin() throws Exception {

        ResponseEntity<Admin> responseEntityToUpdate = restTemplate.postForEntity(
                getURLWithPort("/user/login"), new Admin("login3", "password3",3), Admin.class);
        Admin userFromDBtoUpdate = responseEntityToUpdate.getBody();
        // on met à jour l'utilisateur en lui attribuant le role admin, nouveau login et mot de passe
        userFromDBtoUpdate.setEmail("newEmail");
        userFromDBtoUpdate.setPassword("newPassword");
        userFromDBtoUpdate.setActif(!userFromDBtoUpdate.isActif());

        URI uri = UriComponentsBuilder.fromHttpUrl(URL).path("/user/update").build().toUri();

        HttpEntity<Admin> requestEntity = new HttpEntity<Admin>(userFromDBtoUpdate);

        ResponseEntity<Admin> responseEntity = restTemplate.exchange(uri, HttpMethod.PUT, requestEntity, Admin.class);
        assertNotNull(responseEntity);
        Admin userUpdated = responseEntity.getBody();
        assertNotNull(userUpdated);
        assertEquals("Réponse inattendue", HttpStatus.OK.value(), responseEntity.getStatusCodeValue());
        assertEquals(userFromDBtoUpdate.getEmail(), userUpdated.getEmail());
    }

    @Test
    public void testDeleteAdmin() throws Exception {

        URI uri = UriComponentsBuilder.fromHttpUrl(URL).path("/user/delete")
                .queryParam("id", new Long(2)).build().toUri();

        ResponseEntity<Void> responseEntity = restTemplate.exchange(uri, HttpMethod.DELETE, null, Void.class);
        assertNotNull(responseEntity);
        assertEquals("Réponse inattendue", HttpStatus.GONE.value(), responseEntity.getStatusCodeValue());
    }
}