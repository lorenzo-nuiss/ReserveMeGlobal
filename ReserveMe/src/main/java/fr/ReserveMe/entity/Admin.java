package fr.ReserveMe.entity;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Table(name = "ADMIN")
public class Admin implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    @Column(name = "EMAIL", unique=true)
    private String email;

    @NotBlank
    @Size(max = 20)
    private String username;

    private String password;
    private String phoneNumber;



    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "admin_roles",
            joinColumns = @JoinColumn(name = "admin_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    private String firstName;
    private String lastName;
    @Column(name = "actif", nullable=true)
    private boolean actif;


    public Admin(long id, String email, String password, String phoneNumber, String firstName, String lastName, boolean actif) {
        this.id = id;
        this.email = email;
        this.username = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
       this.firstName = firstName;
        this.lastName = lastName;
        this.actif = actif;
    }



    public Admin(String email, String password, String phoneNumber, String firstName, String lastName, boolean actif) {
        this.email = email;
        this.username = email;

        this.password = password;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.actif = actif;
    }

    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
        this.username = email;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isActif() {
        return actif;
    }

    public void setActif(boolean actif) {
        this.actif = actif;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("User{");
        sb.append("id=").append(id);
        sb.append(", email='").append(email).append('\'');
        sb.append(", password='").append(password).append('\'');
        sb.append(", phoneNumber='").append(phoneNumber).append('\'');
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", actif=").append(actif);
        sb.append('}');
        return sb.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return id == admin.id && actif == admin.actif && Objects.equals(email, admin.email) && Objects.equals(password, admin.password) && Objects.equals(phoneNumber, admin.phoneNumber) && Objects.equals(firstName, admin.firstName) && Objects.equals(lastName, admin.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, phoneNumber, firstName, lastName, actif);
    }
}
