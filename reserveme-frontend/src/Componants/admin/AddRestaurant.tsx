import { Button, TextField, Container } from "@mui/material";
import React, { useState } from "react";
import {
  createRestaurant,
  getTest2,
  getTestApi,
} from "../management/RestaurantManagement";
import { RestaurantFormData } from "../../Type/RestaurantData";

export const AddRestaurant = () => {
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    location: "",
    openingTime: "",
    closingTime: "",
    dayClose: "",
    // Initialisez d'autres champs ici
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createRestaurant(formData);
      console.log("Restaurant créé avec succès:", response);
      // Vous pouvez rediriger l'utilisateur vers une autre page ou afficher un message de succès ici
    } catch (error) {
      console.error("Erreur lors de la création du restaurant:", error);

      // Gérez les erreurs ou affichez un message d'erreur
    }
  };

  console.log(getTestApi());

  return (
    <Container sx={{ mt: 20 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom du restaurant"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Emplacement"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Heure d'ouverture"
          name="openingTime"
          value={formData.openingTime}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Heure de fermeture"
          name="closingTime"
          value={formData.closingTime}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Jours de fermeture"
          name="dayClose"
          value={formData.dayClose}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        {/* Ajoutez d'autres champs ici */}

        <Button type="submit" variant="contained" color="primary">
          Créer le restaurant
        </Button>
      </form>
    </Container>
  );
};
