package fr.ReserveMe.tests.service;

import fr.ReserveMe.dao.AdminRepository;
import fr.ReserveMe.entity.Admin;
import fr.ReserveMe.exception.BusinessResourceException;
import fr.ReserveMe.service.AdminService;
import fr.ReserveMe.service.AdminServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import static org.mockito.Mockito.verify;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import org.springframework.dao.DataIntegrityViolationException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

import static org.junit.Assert.*;

@Service
public class AdminServiceImplTest {

    private AdminService adminService;
    private AdminRepository adminRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Before
    public void setup() {
        adminRepository = Mockito.mock(AdminRepository.class);
       bCryptPasswordEncoder = Mockito.mock(BCryptPasswordEncoder.class);
        adminService = new AdminServiceImpl(adminRepository, bCryptPasswordEncoder);
    }

    @Test
    public void testFindAllAdmins() throws Exception {
        Admin admin = new Admin("Dupont", "password", 1);
        List<Admin> allAdmins = Arrays.asList(admin);
        Mockito.when(adminRepository.findAll()).thenReturn(allAdmins);
        Collection<Admin> admins = adminService.findAll();
        assertNotNull(admins);
        assertEquals(admins, allAdmins);
        assertEquals(admins.size(), allAdmins.size());
        verify(adminRepository).findAll();
    }

    @Test
    public void testSaveAdmin() throws Exception {
        Admin admin = new Admin("Dupont", "password", 1);
        Admin adminMock = new Admin(1L,"Dupont", "password","016666666",2,"truc","truc", true);
        Mockito.when(adminRepository.save((admin))).thenReturn(adminMock);
        Admin adminSaved = adminService.saveOrUpdateAdmin(admin);
        assertNotNull(adminSaved);
        assertEquals(adminMock.getId(), adminSaved.getId());
        assertEquals(adminMock.getEmail(), adminSaved.getEmail());
        assertEquals(adminMock.getEmail(), adminSaved.getEmail());
        verify(adminRepository).save(any(Admin.class));
    }

    @Test(expected=BusinessResourceException.class)
    public void testSaveAdmin_existing_login_throws_error() throws Exception {
        Admin admin = new Admin("Dupont", "password", 1);
        Mockito.when(adminRepository.save((admin))).thenThrow(new DataIntegrityViolationException("Duplicate Email"));
        adminService.saveOrUpdateAdmin(admin);
        verify(adminRepository).save(any(Admin.class));
    }

    @Test
    public void testFindAdminByEmail() {
        Admin admin = new Admin("Dupont", "password", 1);
        Mockito.when(adminRepository.findByEmail(admin.getEmail())).thenReturn(Optional.ofNullable(admin));
        Optional<Admin> adminFromDB = adminService.findByEmail(admin.getEmail());
        assertNotNull(adminFromDB);
        assertThat(adminFromDB.get().getEmail(), is(admin.getEmail()));
        verify(adminRepository).findByEmail(any(String.class));
    }

    @Test
    public void testUpdateAdmin() throws Exception {
        Admin adminToUpdate = new Admin(1L,"Dupont", "password","016666666",2,"truc","truc", true);
        Admin adminFoundById = new Admin(1L,"oldDupont", "oldpassword","016666666",2,"truc","truc", true);

        Admin adminUpdated = new Admin(1L,"NewDupont", "newPassword","016666666",2,"truc","truc", true);;

        Mockito.when(adminRepository.findById(1L)).thenReturn(Optional.of(adminFoundById));
        Mockito.when(bCryptPasswordEncoder.matches(any(String.class), any(String.class))).thenReturn(false);
        Mockito.when(bCryptPasswordEncoder.encode(any(String.class))).thenReturn("newPassword");
        Mockito.when(adminRepository.save((adminToUpdate))).thenReturn(adminUpdated);
        Admin adminFromDB = adminService.saveOrUpdateAdmin(adminToUpdate);
        assertNotNull(adminFromDB);
        verify(adminRepository).save(any(Admin.class));
        assertEquals(1, adminFromDB.getId());
        assertEquals("NewDupont", adminFromDB.getEmail());
        assertEquals("newPassword", adminFromDB.getPassword());
    }

    @Test
    public void testDelete() throws Exception {
        Admin adminTodelete = new Admin(1L,"Dupont", "password","016666666",2,"truc","truc", true);
        Mockito.doNothing().when(adminRepository).deleteById(adminTodelete.getId());
        adminService.deleteAdmin(adminTodelete.getId());
        verify(adminRepository).deleteById(any(Long.class));
    }

}
