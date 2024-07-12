package fr.ReserveMe.dao;

import fr.ReserveMe.entity.Menu;
import fr.ReserveMe.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findAllByMenuId(Long id);
}
