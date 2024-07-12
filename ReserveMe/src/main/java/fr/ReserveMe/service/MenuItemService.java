package fr.ReserveMe.service;

import fr.ReserveMe.entity.MenuItem;
import fr.ReserveMe.exception.BusinessResourceException;

import java.util.List;
import java.util.Optional;

public interface MenuItemService {
    List<MenuItem> findAllMenuItem();

    Optional<MenuItem> findMenuItemById(Long id) throws BusinessResourceException;

    MenuItem createMenuItem(MenuItem menuItem, Long id) throws BusinessResourceException;

    MenuItem createItem(MenuItem menuItem) throws BusinessResourceException;

    MenuItem updateMenuItem(Long id, MenuItem menuItem) throws BusinessResourceException;

    MenuItem updateMenuItemComplete(Long id, MenuItem menuItem) throws BusinessResourceException;

    void deleteMenuItem(Long id) throws BusinessResourceException;

    List<MenuItem> findAllByMenuId(Long id);

}
