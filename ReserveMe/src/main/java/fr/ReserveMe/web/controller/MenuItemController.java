package fr.ReserveMe.web.controller;


import fr.ReserveMe.entity.MenuItem;
import fr.ReserveMe.exception.BusinessResourceException;
import fr.ReserveMe.service.MenuItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    //    findAll
    @GetMapping("/public/item-menu")
    public ResponseEntity<List<MenuItem>> getAllItemsMenus() {
        List<MenuItem> menus = menuItemService.findAllMenuItem();
        return ResponseEntity.ok(menus);
    }

    //    findById
    @GetMapping("/public/item-menu/{id}")
    public ResponseEntity<?> getMenuById(@PathVariable Long id) {
        try {
            Optional<MenuItem> menuItem = menuItemService.findMenuItemById(id);
            if (menuItem.isPresent()) {
                return ResponseEntity.ok(menuItem.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //    create
    @PostMapping("/admin/item-menu")
    public ResponseEntity<MenuItem> createMenu(@RequestBody MenuItem item) throws BusinessResourceException {
        try {
            MenuItem createdMenu = menuItemService.createItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMenu);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/admin/item-menu/{menuId}/add")
    public ResponseEntity<MenuItem> addMenuItemToMenu(@PathVariable Long menuId, @RequestBody MenuItem menuItem) throws BusinessResourceException {
        try {
            MenuItem createdMenuItem = menuItemService.createMenuItem(menuItem, menuId);
            return new ResponseEntity<MenuItem>(createdMenuItem, HttpStatus.CREATED);
        } catch (BusinessResourceException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //    Update
    @PutMapping("/admin/item-menu/{id}")
    public ResponseEntity<MenuItem> updateMenu(@PathVariable Long id, @RequestBody MenuItem item) throws BusinessResourceException {
        try {
            MenuItem updatedMenu = menuItemService.updateMenuItem(id, item);
            return ResponseEntity.ok(updatedMenu);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //    Delete
    @DeleteMapping(value = "/admin/item-menu/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) throws BusinessResourceException {
        try {
            menuItemService.deleteMenuItem(id);
            return ResponseEntity.noContent().build();
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //    findAllById
    @GetMapping("/public/item-menu/list/{id}")
    public ResponseEntity<List<MenuItem>> getAllItemsById(@PathVariable Long id) {
        List<MenuItem> menus = menuItemService.findAllByMenuId(id);
        return ResponseEntity.ok(menus);
    }

}
