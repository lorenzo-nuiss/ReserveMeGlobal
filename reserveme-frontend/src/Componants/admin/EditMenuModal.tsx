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
import { MenuForm, MenuRepo } from "../../Type/MenuData";
import {
  createMenu,
  deleteMenu,
  updateMenu,
} from "../management/MenuReservationManagement";

type TableMenuItemProps = {
  menuSelected: MenuRepo;
  isOpen: boolean;
  onClose: () => void;
  updateMenuList: () => void;
  showAlert: (
    texte: string,
    texteSeverity: "success" | "error" | "info" | "warning"
  ) => void;
};

export const EditMenuModal = ({
  isOpen,
  onClose,
  updateMenuList,
  menuSelected,
  showAlert,
}: TableMenuItemProps) => {
  const initialFormData: MenuForm = {
    name: menuSelected.name,
    description: menuSelected.description,
  };

  const [formData, setFormData] = useState<MenuForm>(initialFormData);
  const menuId = menuSelected.id;

  const mutation = useMutation({
    mutationFn: (variables: { menuId: number; formData: MenuForm }) =>
      updateMenu(variables.menuId, variables.formData),
    onSuccess: (data) => {
      // Appeler la fonction de mise à jour de la liste des réservations
      updateMenuList();
      // Fermez le modal (si nécessaire)
      showAlert("Catégorie bien modifiée !", "success");
      onClose();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      updateMenuList();
      // Fermez le modal (si nécessaire)
      showAlert("Catégorie bien supprimée !", "error");
      onClose();
    },
  });

  useEffect(() => {
    if (menuSelected) {
      setFormData({
        name: menuSelected.name,
        description: menuSelected.description,
      });
    }
  }, [menuSelected]);

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
      await mutation.mutateAsync({ menuId, formData });
    } catch (error) {
      // Gérez les erreurs ici
      console.error("Erreur lors de la mutation : ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await mutationDelete.mutateAsync(menuId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
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
      <DialogTitle>Modifier une catégorie</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        {/* Formulaire de modification */}
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} py={1}>
              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Nom"
                  color="primary2"
                  variant="outlined"
                  value={formData.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </Grid>
              <Grid xs={12} sm={6}>
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
                  color="error"
                  onClick={handleDelete}
                  sx={{ mt: 1, px: 4.2, py: 1.5, mx: 4 }}
                >
                  Supprimer
                </Button>
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
