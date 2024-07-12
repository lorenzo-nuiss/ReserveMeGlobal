package fr.ReserveMe.tests.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
//for HTTP methods
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//for HTTP status
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.*;

import fr.ReserveMe.entity.Admin;
import fr.ReserveMe.service.AdminService;
import fr.ReserveMe.web.controller.AdminController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = AdminController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class AdminControllerTest {

    Random random = new Random();
    int randomNumber = random.nextInt(900) + 100;

    @Autowired
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @MockBean
    private AdminService adminService;

    Admin admin;

    @Before
    public void setUp() {
        // Initialisation du setup avant chaque test

        admin = new Admin("Dupont", "password", 1);
        List<Admin> allAdmins = Arrays.asList(admin);
        objectMapper = new ObjectMapper();

        // Mock de la couche de service
        when(adminService.findAll()).thenReturn(allAdmins);
        when(adminService.findAdminById(any(Long.class))).thenReturn(Optional.of(admin));

    }

    @Test
    public void testFindAllAdmins() throws Exception {

        MvcResult result = mockMvc.perform(get("/user/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isFound()).andReturn();

        // ceci est une redondance, car déjà vérifié par: isFound())
        assertEquals("Réponse incorrecte", HttpStatus.FOUND.value(), result.getResponse().getStatus());
        verify(adminService).findAll();
        assertNotNull(result);
        Collection<Admin> admins = objectMapper.readValue(result.getResponse().getContentAsString(),
                new TypeReference<Collection<Admin>>() {
                });
        assertNotNull(admins);
        assertEquals(1, admins.size());
        Admin adminResult = admins.iterator().next();
        assertEquals(admin.getEmail(), adminResult.getEmail());
        assertEquals(admin.getPassword(), adminResult.getPassword());

    }

    @Test
    public void testSaveAdmin() throws Exception {

        Admin adminToSave = new Admin("Dupont", "password", 1);
        String jsonContent = objectMapper.writeValueAsString(adminToSave);
        when(adminService.saveOrUpdateAdmin(any(Admin.class))).thenReturn(admin);
        MvcResult result = mockMvc
                .perform(post("/user/create").contentType(MediaType.APPLICATION_JSON).content(jsonContent))
                .andExpect(status().isCreated()).andReturn();

        assertEquals("Erreur de sauvegarde", HttpStatus.CREATED.value(), result.getResponse().getStatus());
        verify(adminService).saveOrUpdateAdmin(any(Admin.class));
        Admin adminResult = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<Admin>() {
        });
        assertNotNull(adminResult);
        assertEquals(adminToSave.getEmail(), adminResult.getEmail());
        assertEquals(adminToSave.getPassword(), adminResult.getPassword());

    }

    @Test
    public void testFindAdminByEmail() throws Exception {
        when(adminService.findByEmailAndPassword("Dupont", "password")).thenReturn(Optional.ofNullable(admin));
        Admin adminTofindByEmail = new Admin("Dupont", "password",1);
        String jsonContent = objectMapper.writeValueAsString(adminTofindByEmail);
        // on execute la requête
        MvcResult result = mockMvc
                .perform(post("/user/login").contentType(MediaType.APPLICATION_JSON).content(jsonContent))
                .andExpect(status().isFound()).andReturn();

        assertEquals("Erreur de sauvegarde", HttpStatus.FOUND.value(), result.getResponse().getStatus());
        verify(adminService).findByEmailAndPassword(any(String.class), any(String.class));
        Admin adminResult = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<Admin>() {
        });
        assertNotNull(adminResult);
        assertEquals(1, adminResult.getId());
        assertEquals(adminTofindByEmail.getEmail(), adminResult.getEmail());
        assertEquals(adminTofindByEmail.getPassword(), adminResult.getPassword());
    }

    @Test
    public void testDeleteAdmin() throws Exception {

        MvcResult result = mockMvc.perform(delete("/user/delete/").param("id", "1"))
                .andExpect(status().isGone()).andReturn();
        assertEquals("Erreur de suppression", HttpStatus.GONE.value(), result.getResponse().getStatus());
        verify(adminService).deleteAdmin(any(Long.class));
    }

    @Test
    public void testUpdateAdmin() throws Exception {

        Admin adminToUpdate = new Admin("Toto", "password", 1);
        Admin adminUpdated = new Admin(2L, "Toto", "password","061355555",2,"firstnaùe","lastname",false);
        String jsonContent = objectMapper.writeValueAsString(adminToUpdate);
        when(adminService.saveOrUpdateAdmin(adminToUpdate)).thenReturn(adminUpdated);
        // on execute la requête
        MvcResult result = mockMvc
                .perform(MockMvcRequestBuilders.put("/user/update/").contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON).content(jsonContent))
                .andExpect(status().isOk()).andReturn();

        verify(adminService).saveOrUpdateAdmin(any(Admin.class));
        Admin adminResult = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<Admin>() {
        });
        assertNotNull(adminResult);
        assertEquals(2, adminResult.getId());
        assertEquals(adminToUpdate.getEmail(), adminResult.getEmail());
        assertEquals(adminToUpdate.getPassword(), adminResult.getPassword());
        assertEquals(adminToUpdate.isActif(), adminResult.isActif());
    }

}