export type MenuRepo = {
  id: number;
  name: string;
  description: string;
};
export type MenuForm = {
  name: string;
  description: string;
};

export type MenuItemRepo = {
  id: number;
  name: string;
  description: string;
  price: number;
};
export type MenuItemForm = {
  name: string;
  description: string;
  price: number;
};
