package fr.ReserveMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Menu implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "menu")
    @JsonIgnore
    private List<MenuItem> items;

    // Constructors, getters, and setters

    public Menu(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public void setItems(List<MenuItem> items) {
        this.items = items;
    }

    // Add convenience method to add a MenuItem to the menu

    public void addItem(MenuItem item) {
        items.add(item);
        item.setMenu(this);
    }

    // Add convenience method to remove a MenuItem from the menu
    public void removeItem(MenuItem item) {
        items.remove(item);
        item.setMenu(null);
    }
}
