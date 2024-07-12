package fr.ReserveMe.service;

import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.exception.BusinessResourceException;

import java.util.List;
import java.util.Optional;

public interface MenuService {

    List<Menu> findAllMenu()  throws BusinessResourceException;

    Optional<Menu> findMenuById(Long id) throws BusinessResourceException;

    Menu createMenu(Menu menu) throws BusinessResourceException;

    Menu updateMenu(Long id, Menu menu) throws BusinessResourceException;

    void deleteMenu(Long id) throws BusinessResourceException;

    void addItemToMenu(Long menuId, Long itemId) throws BusinessResourceException;

    void removeItemFromMenu(Long menuId, Long itemId) throws BusinessResourceException;
}
