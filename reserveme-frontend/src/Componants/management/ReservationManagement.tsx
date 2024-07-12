import axios from "axios";

import { FormData } from "../../Type/UserData";
import AuthService from "./AuthService";
import authHeader from "./AuthHeader";
import {
  ReservationFormType,
  ReservationFormTypeDate,
} from "../../Type/ReservationData";

const headers = authHeader();

// Définissez la fonction pour récupérer les données
export async function getAllReservation() {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        "/admin/reservations/list/" +
        import.meta.env.VITE_API_KEY,
      { headers: headers }
    );
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

export async function getAllReservationWaiting() {
  const headersN = authHeader();

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        "/admin/reservations/list/waiting/" +
        import.meta.env.VITE_API_KEY,
      { headers: headersN }
    );
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);

    // Ajoutez ": any" pour typage explicite de l'erreur
    throw new Error(`Une erreur s'est produite : ${error.message}`);
  }
}

export const createReservation2 = async (
  date: string,
  guests: number,
  firstname: string,
  lastname: string,
  phone_number: string
) => {
  try {
    // Effectuez une requête HTTP POST pour créer la réservation
    const response = await axios.post(
      import.meta.env.VITE_API_URL +
        "/public/reservations/create/" +
        import.meta.env.VITE_API_KEY,
      {
        date,
        guests,
        firstname,
        lastname,
        phone_number,
      }
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
    console.log(error);

    throw error;
  }
};

export const createReservation = async (
  reservationData: FormData | ReservationFormTypeDate
) => {
  try {
    // Effectuez une requête HTTP POST pour créer la réservation
    const response = await axios.post(
      import.meta.env.VITE_API_URL +
        "/public/reservations/create/" +
        import.meta.env.VITE_API_KEY,
      reservationData
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

export const updateReservation = async (
  reservationId: number, // ID de la réservation à mettre à jour
  reservationData: FormData // Nouvelles données de réservation
) => {
  try {
    // Effectuez une requête HTTP PUT ou PATCH pour mettre à jour la réservation
    const response = await axios.put(
      // Utilisez axios.put pour une mise à jour complète, ou axios.patch pour une mise à jour partielle
      `${import.meta.env.VITE_API_URL}/public/reservations/${reservationId}`,
      reservationData,
      { headers: headers }
    );
    if (response.data) {
      return response.data;
    } else {
      // Sinon, renvoyez une erreur ou une valeur par défaut
      throw new Error("Erreur lors de la mise à jour de la réservation");
    }
  } catch (error) {
    // Gérez les erreurs, vous pouvez les renvoyer ou les gérer ici
    throw error;
  }
};

export const deleteReservation = async (reservationId: number) => {
  try {
    // Effectuez une requête HTTP DELETE pour supprimer la réservation avec l'ID spécifié
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/public/reservations/${reservationId}`,
      { headers: headers }
    );

    // Vérifiez si la réponse indique que la réservation a été supprimée avec succès
    if (response.status !== 204) {
      throw new Error("Erreur lors de la suppression de la réservation");
    }
  } catch (error) {
    throw error;
  }
};

export const acceptReservation = async (reservationId: number) => {
  try {
    // Effectuez une requête HTTP DELETE pour supprimer la réservation avec l'ID spécifié
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/admin/reservations/accept/${reservationId}`,
      { headers: headers }
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Erreur lors de la mise à jour de la réservation");
    }
  } catch (error) {
    throw error;
  }
};
