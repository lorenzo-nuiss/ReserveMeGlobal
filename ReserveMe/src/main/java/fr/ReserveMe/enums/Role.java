package fr.ReserveMe.enums;

public enum Role {

    ADMIN("ADMIN_ROLE"),
    SUPER_ADMIN("SUPER_ADMIN_ROLE"),
    MODERATOR("MODERATEUR");

    private String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
