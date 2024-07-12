import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { MenuItemForm, MenuItemRepo } from "../../Type/MenuData";
import {
  deleteMenu,
  updateMenu,
} from "../management/MenuReservationManagement";
import { updateMenuItem } from "../management/MenuItemManagement";

type TableMenuItemProps = {
  menuItemSelected: MenuItemRepo;
  isOpen: boolean;
  onClose: () => void;
  updateMenuItemList: () => void;
  showAlert: (
    texte: string,
    texteSeverity: "success" | "error" | "info" | "warning"
  ) => void;
};

export const EditMenuItemModal = ({
  isOpen,
  onClose,
  updateMenuItemList,
  menuItemSelected,
  showAlert,
}: TableMenuItemProps) => {
  const initialFormData: MenuItemForm = {
    name: menuItemSelected.name,
    description: menuItemSelected.description,
    price: menuItemSelected.price,
  };

  const [formData, setFormData] = useState<MenuItemForm>(initialFormData);
  const itemId = menuItemSelected.id;

  const mutation = useMutation({
    mutationFn: (variables: { itemId: number; formData: MenuItemForm }) =>
      updateMenuItem(variables.itemId, variables.formData),
    onSuccess: (data) => {
      // Appeler la fonction de mise à jour de la liste des réservations
      updateMenuItemList();
      // Fermez le modal (si nécessaire)
      showAlert("Modification  bien enregistrée !", "success");
      onClose();
    },
  });

  useEffect(() => {
    if (menuItemSelected) {
      setFormData({
        name: menuItemSelected.name,
        description: menuItemSelected.description,
        price: menuItemSelected.price,
      });
    }
  }, [menuItemSelected]);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({ itemId, formData });
    } catch (error) {
      // Gérez les erreurs ici
      console.error("Erreur lors de la mutation : ", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          p: 3,
          maxHeight: "calc(100% - 54px)",
          maxWidth: "800px",
        },
      }}
    >
      <DialogTitle>Modification</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        {/* Formulaire de modification */}
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} py={1}>
              <Grid xs={12} sm={8}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Nom"
                  color="primary2"
                  variant="outlined"
                  value={formData.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Prix"
                  color="primary2"
                  variant="outlined"
                  value={formData.price}
                  onChange={(e) => handleChange(e, "price")}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Description"
                  color="primary2"
                  variant="outlined"
                  value={formData.description}
                  onChange={(e) => handleChange(e, "description")}
                />
              </Grid>

              <Grid
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  color="primary2"
                  type="submit"
                  sx={{ mt: 1, px: 4.2, py: 1.5 }}
                >
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
