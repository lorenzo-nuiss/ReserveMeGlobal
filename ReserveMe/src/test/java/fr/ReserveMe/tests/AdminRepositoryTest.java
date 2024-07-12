package fr.ReserveMe.tests;import fr.ReserveMe.dao.AdminRepository;
import fr.ReserveMe.entity.Admin;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class AdminRepositoryTest {

    Random random = new Random();
    int randomNumber = random.nextInt(900) + 100;
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AdminRepository adminRepository;

    Admin admin = new Admin("DuponSant"+ Integer.toString(randomNumber), "password", 2);
    Admin admin2 = new Admin("Maupassan"+Integer.toString(randomNumber), "password", 1);
    Admin admin3 = new Admin("James2"+Integer.toString(randomNumber), "lebron", 3);

    @Before
    public void setup() {
        entityManager.persist(admin);
        entityManager.persist(admin2);
        entityManager.persist(admin3);
        entityManager.flush();
    }

    @Test
    public void testFindAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        assertThat(3, is(admins.size()));
    }

    @Test
    public void testSaveAdmin() {
        Admin admin = new Admin("Paule"+Integer.toString(randomNumber), "passwordE", 1);
        Admin adminSaved = adminRepository.save(admin);
        assertNotNull(adminSaved.getId());
        assertThat("Paule"+Integer.toString(randomNumber), is(adminSaved.getEmail()));
    }

    @Test
    public void testFindByLogin() {
        Optional<Admin> adminFromDB = adminRepository.findByEmail("James"+Integer.toString(randomNumber));
        assertThat("James"+Integer.toString(randomNumber), is(adminFromDB.get().getEmail()));
    }

    @Test
    public void testFindById() {
        Optional<Admin> adminFromDB = adminRepository.findById(admin.getId());
        assertThat(admin.getEmail(), is(adminFromDB.get().getEmail()));
    }

    @Test
    public void testFindByUnknownId() {
        Optional<Admin> adminFromDB = adminRepository.findById(50L);
        assertEquals(Optional.empty(), adminFromDB);
    }

    @Test
    public void testDeleteAdmin() {
        adminRepository.deleteById(admin.getId());
        Optional<Admin> adminFromDB = adminRepository.findByEmail(admin.getEmail());
        assertEquals(Optional.empty(), adminFromDB);
    }

    @Test
    public void testUpdateAdmin() {
        Optional<Admin> adminToUpdate = adminRepository.findByEmail(admin.getEmail());
        adminToUpdate.get().setActif(false);
        adminRepository.save(adminToUpdate.get());
        Optional<Admin> adminUpdatedFromDB = adminRepository.findByEmail(adminToUpdate.get().getEmail());
        assertNotNull(adminUpdatedFromDB);
        assertThat(false, is(adminUpdatedFromDB.get().isActif()));
    }
}
