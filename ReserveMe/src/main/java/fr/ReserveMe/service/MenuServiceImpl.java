package fr.ReserveMe.service;

import fr.ReserveMe.dao.MenuItemRepository;
import fr.ReserveMe.dao.MenuRepository;
import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.entity.MenuItem;
import fr.ReserveMe.exception.BusinessResourceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MenuServiceImpl extends CrudService<Menu, Long> implements MenuService{

    private final MenuRepository menuRepository;
    private final MenuItemRepository menuItemRepository;

    private static final Logger logger = LoggerFactory.getLogger(MenuServiceImpl.class);


    @Autowired
    public MenuServiceImpl(MenuRepository menuRepository, MenuItemRepository menuItemRepository) {
        this.menuRepository = menuRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    protected JpaRepository<Menu, Long> getRepository() {
        return menuRepository;
    }

    @Override
    protected String getEntityName() {
        return "Menu";
    }


    @Override
    public List<Menu> findAllMenu() throws BusinessResourceException {
        return findAll();
    }

    @Override
    public Optional<Menu> findMenuById(Long id) throws BusinessResourceException {
        return findById(id);
    }

    @Override
    public Menu createMenu(Menu menu) throws BusinessResourceException {
        if (menu.getId() != null) {
            throw new BusinessResourceException(getEntityName() + " ID must be null for creation.");
        }
        return save(menu);
    }

    @Override
    @Transactional(readOnly=false)
    public Menu updateMenu(Long id, Menu menu) throws BusinessResourceException {
        System.out.println("------------ dans update ----------");
        if (!menuRepository.existsById(id)) {
            throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
        }
        try {
        menu.setId(id);
        return save(menu);
        }catch (Exception e){
            throw new BusinessResourceException("UpdateError", " "+e,  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional(readOnly=false)
    public void deleteMenu(Long id) throws BusinessResourceException {
        Optional<Menu> menu = findById(id);
        if (menu == null) {
            throw new BusinessResourceException("Menu not found with id: " + id);
        }

        deleteById(id);
    }

    @Override
    public void addItemToMenu(Long menuId, Long itemId) throws BusinessResourceException {
        // Vérifier si le menu existe
        Optional<Menu> menuRepo = findById(menuId);
        Menu menu = menuRepo.get();
        if (menu == null) {
            throw new BusinessResourceException("Menu not found with id: " + menuId);
        }

        // Vérifier si l'item existe
        Optional<MenuItem> menuItem = menuItemRepository.findById(itemId);
        if (!menuItem.isPresent()) {
            throw new BusinessResourceException("MenuItem not found with id: " + itemId);
        }

        // Ajouter l'item au menu
        MenuItem item = menuItem.get();

        List<MenuItem> items = menu.getItems();
        items.add(item);
        menu.setItems(items);
        menuRepository.save(menu);
//        logger.info("MenuItem added to " + getEntityName() + " with id: " + menuId);
    }

    @Override
    public void removeItemFromMenu(Long menuId, Long itemId) throws BusinessResourceException {
// Vérifier si le menu existe
        Optional<Menu> menu = findById(menuId);
        if (menu == null) {
            throw new BusinessResourceException("Menu not found with id: " + menuId);
        }

        // Vérifier si l'item existe
        Optional<MenuItem> optionalItem = menuItemRepository.findById(itemId);
        if (!optionalItem.isPresent()) {
            throw new BusinessResourceException("MenuItem not found with id: " + itemId);
        }

        // Retirer l'item du menu
        MenuItem item = optionalItem.get();
        List<MenuItem> items = menu.get().getItems();
        try {

            items.remove(item);
            menu.get().setItems(items);
            menuRepository.save(menu.get());
        }catch (BusinessResourceException e){
            logger.info("MenuItem can't removed from " + getEntityName() + " with id: " + menuId, e);
        }
    }
}
