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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImpl extends  CrudService<MenuItem, Long> implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuRepository menuRepository;


    private static final Logger logger = LoggerFactory.getLogger(MenuItemServiceImpl.class);

    @Autowired
    public MenuItemServiceImpl(MenuItemRepository menuItemRepository, MenuRepository menuRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuRepository = menuRepository;
    }

    @Override
    protected JpaRepository<MenuItem, Long> getRepository() {
        return menuItemRepository;
    }

    @Override
    protected String getEntityName() {
        return "MenuItem";
    }

    @Override
    public List<MenuItem> findAllMenuItem() throws BusinessResourceException{
        return findAll();
    }

    @Override
    public Optional<MenuItem> findMenuItemById(Long id) throws BusinessResourceException {
        return findById(id);
    }

    @Override
    public MenuItem createItem(MenuItem menuItem) throws BusinessResourceException {
        if (menuItem.getId() != null) {
            throw new BusinessResourceException(getEntityName() + " ID must be null for creation.");
        }
        return save(menuItem);
    }

    public MenuItem createMenuItem(MenuItem menuItem, Long menuId) throws BusinessResourceException {
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);

        if (optionalMenu.isEmpty()) {
            throw new BusinessResourceException("Menu not found with id: " + menuId);
        }
        Menu menu = optionalMenu.get();
        menuItem.setMenu(menu);

        return menuItemRepository.save(menuItem);
    }

    @Transactional
    @Override
    public MenuItem updateMenuItem(Long id, MenuItem menuItem) throws BusinessResourceException {
        Optional<MenuItem> existingItem = menuItemRepository.findById(id);
        if (!menuItemRepository.existsById(id)) {
            throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
        }
        // Mettre à jour les propriétés du MenuItem existant

        MenuItem existingMenuItem = existingItem.get();

        if (menuItem.getName() != null) {
            existingMenuItem.setName(menuItem.getName());
        }
        if (menuItem.getDescription() != null) {
            existingMenuItem.setDescription(menuItem.getDescription());
        }
        if (menuItem.getPrice() != null) {
            existingMenuItem.setPrice(menuItem.getPrice());
        }


        // Enregistrer les modifications
        return menuItemRepository.save(existingMenuItem);
    }

//    met a jour en supprimant l'association
    @Transactional(readOnly=false)
    @Override
    public MenuItem updateMenuItemComplete(Long id, MenuItem menuItem) throws BusinessResourceException {
        if (!menuItemRepository.existsById(id)) {
            throw new BusinessResourceException(getEntityName() + " with ID " + id + " does not exist.");
        }
        menuItem.setId(id);
        return save(menuItem);
    }

    @Transactional(readOnly=false)
    @Override
    public void deleteMenuItem(Long id) throws BusinessResourceException {
        Optional<MenuItem> menuItem = findById(id);
        if (menuItem == null) {
            throw new BusinessResourceException("Menu not found with id: " + id);
        }
        deleteById(id);
    }

    @Override
    public List<MenuItem> findAllByMenuId(Long id) {
        return menuItemRepository.findAllByMenuId(id);
    }

}
