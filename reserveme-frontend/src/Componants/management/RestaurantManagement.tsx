import axios from "axios";
import AuthService from "./AuthService";
import { RestaurantFormData } from "../../Type/RestaurantData";
import authHeader from "./AuthHeader";

const headers = authHeader();

export const createRestaurant = async (restaurantData: RestaurantFormData) => {
  console.log(headers);

  try {
    // Effectuez une requête HTTP POST pour créer la réservation
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/admin/restaurants/create/ ",
      restaurantData,
      { headers: headers }
    );

    // Vérifiez si la réponse contient les données de la réservation créée
    if (response.data) {
      // Si les données sont présentes, renvoyez-les
      return response.data;
    } else {
      // Sinon, renvoyez une erreur ou une valeur par défaut
      throw new Error("Erreur lors de la création de la réservation");
    }
  } catch (error) {
    // Gérez les erreurs, vous pouvez les renvoyer ou les gérer ici
    throw error;
  }
};

export async function getTestApi() {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/test/", {
      headers: headers,
    });
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Ajoutez ": any" pour typage explicite de l'erreur
    throw new Error(`Une erreur s'est produite : ${error.message}`);
  }
}

export const getTest2 = () => {
  return axios.get(import.meta.env.VITE_API_URL + "/test/", {
    headers: authHeader(),
  });
};
