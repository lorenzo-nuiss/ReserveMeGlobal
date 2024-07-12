import axios from "axios";
import { MenuForm } from "../../Type/MenuData";
import authHeader from "./AuthHeader";

const headers = authHeader();

export const getMenuItemList = async (menuId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/item-menu/list/${menuId}`
    );

    if (response.status === 200) {
      return response.data; // Les données des MenuItem
    } else {
      throw new Error(
        "Erreur lors de la récupération de la liste des MenuItem"
      );
    }
  } catch (error) {
    throw error;
  }
};

export const getMenuList = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/menu/`
    );

    if (response.status === 200) {
      return response.data; // Les données des MenuItem
    } else {
      throw new Error(
        "Erreur lors de la récupération de la liste des MenuItem"
      );
    }
  } catch (error) {
    throw error;
  }
};

export const createMenu = async (menuData: MenuForm) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/admin/menu/",
      menuData,
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

export const updateMenu = async (menuId: number, menuData: MenuForm) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/menu/${menuId}`,
      menuData,
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

export const deleteMenu = async (menuId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/menu/${menuId}`,
      { headers: headers }
    );
    if (response.status !== 204) {
      throw new Error("Erreur lors de la suppression d'une catégorie");
    }
  } catch (error) {
    throw error;
  }
};
