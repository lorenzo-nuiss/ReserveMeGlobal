package fr.ReserveMe.enums;

public enum Civilite {
    MONSIEUR("Monsieur"),
    MADAME("Madame");

    private final String civilite;

    Civilite(String civilite) {
        this.civilite = civilite;
    }

    public String getCivilite() {
        return civilite;
    }
}
