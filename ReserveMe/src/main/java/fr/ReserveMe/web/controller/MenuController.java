package fr.ReserveMe.web.controller;

import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.exception.BusinessResourceException;
import fr.ReserveMe.service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

//    findAll
    @GetMapping("/public/menu")
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = menuService.findAllMenu();
        return ResponseEntity.ok(menus);

    }

    //    findById
    @GetMapping("/public/menu/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        try {
            Optional<Menu> menu = menuService.findMenuById(id);
            if (menu.isPresent()) {
                return ResponseEntity.ok(menu.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    //    create
    @PostMapping("/admin/menu")
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) throws BusinessResourceException {
        try {
            Menu createdMenu = menuService.createMenu(menu);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMenu);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

//    Update
    @PutMapping("/admin/menu/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menu) throws BusinessResourceException {
        try {
            Menu updatedMenu = menuService.updateMenu(id, menu);
            return ResponseEntity.ok(updatedMenu);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

//    Delete
    @DeleteMapping(value = "/admin/menu/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) throws BusinessResourceException {
        try {
            menuService.deleteMenu(id);
            return ResponseEntity.noContent().build();
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PostMapping("/admin/menu/{menuId}/items/{itemId}")
    public ResponseEntity<Void> addItemToMenu(@PathVariable Long menuId, @PathVariable Long itemId) throws BusinessResourceException {
        try {
        menuService.addItemToMenu(menuId, itemId);
        return new ResponseEntity<>(HttpStatus.OK);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/admin/menu/{menuId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromMenu(@PathVariable Long menuId, @PathVariable Long itemId) throws BusinessResourceException {
        try {
            menuService.removeItemFromMenu(menuId, itemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BusinessResourceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
