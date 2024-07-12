import axios from "axios";
import { MenuItemForm } from "../../Type/MenuData";
import AuthService from "./AuthService";
import authHeader from "./AuthHeader";

const headers = authHeader();

export const getMenuItemList = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/item-menu/`
    );

    if (response.status === 200) {
      return response.data; // Les données des MenuItemItem
    } else {
      throw new Error(
        "Erreur lors de la récupération de la liste des MenuItem"
      );
    }
  } catch (error) {
    throw error;
  }
};

export const createMenuItem = async (
  menuId: number,
  menuItemData: MenuItemForm
) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/admin/item-menu/" + menuId + "/add",
      menuItemData,
      { headers: headers }
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Erreur lors de la création d'une catégorie");
    }
  } catch (error) {
    throw error;
  }
};

export const updateMenuItem = async (
  menuItemId: number,
  menuItemData: MenuItemForm
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/item-menu/${menuItemId}`,
      menuItemData,
      { headers: headers }
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Erreur lors de la mise à jour de la catégorie");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItem = async (menuItemId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/item-menu/${menuItemId}`,
      { headers: headers }
    );
    if (response.status !== 204) {
      throw new Error("Erreur lors de la suppression d'une catégorie");
    }
  } catch (error) {
    throw error;
  }
};
