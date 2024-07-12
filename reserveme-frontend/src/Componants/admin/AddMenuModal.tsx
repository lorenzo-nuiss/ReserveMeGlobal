import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { MenuForm } from "../../Type/MenuData";
import { createMenu } from "../management/MenuReservationManagement";

type TableMenuItemProps = {
  isOpen: boolean;
  onClose: () => void;
  updateMenuList: () => void;
  showAlert: (
    texte: string,
    texteSeverity: "success" | "error" | "info" | "warning"
  ) => void;
};

export const AddMenuModal = ({
  isOpen,
  onClose,
  updateMenuList,
  showAlert,
}: TableMenuItemProps) => {
  const initialFormData: MenuForm = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState<MenuForm>(initialFormData);
  const mutation = useMutation({ mutationFn: createMenu });

  const handleClose = () => {
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: () => {
        console.log("success");
        showAlert("Catégorie bien ajoutée !", "success");
        updateMenuList();
        onClose();
      },
    });
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
      <DialogTitle>Enregistrer une catégorie</DialogTitle>

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
                  color="primary2"
                  type="submit"
                  sx={{ mt: 1, px: 4.2, py: 1.5 }}
                >
                  Ajouter
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
