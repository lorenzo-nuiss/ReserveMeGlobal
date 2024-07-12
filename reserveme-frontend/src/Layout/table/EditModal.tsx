import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { UserData } from "../../Type/UserData";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserData; // UserData est votre type d'utilisateur
  onUpdateUser: (user: UserData) => void; // Fonction pour mettre à jour l'utilisateur
}

const EditModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  user,
  onUpdateUser,
}) => {
  // État local pour gérer les valeurs du formulaire
  const [formData, setFormData] = React.useState<UserData>({
    id: user.id, // L'ID de l'utilisateur reste inchangé
    date: user.date,
    firstname: user.firstname,
    lastname: user.lastname,
    guests: user.guests,
    notes: user.notes,
    phoneNumber: user.phoneNumber,
    status: user.status,
    email: user.email,
  });

  // Gestionnaire pour mettre à jour les valeurs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestionnaire pour soumettre le formulaire de mise à jour
  const handleSubmit = () => {
    // Appelez votre fonction onUpdateUser avec les nouvelles données
    onUpdateUser(formData);
    onClose(); // Fermez le modal après la mise à jour
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6">Modifier l'utilisateur</Typography>
        <form>
          {/* Champs du formulaire */}
          <TextField
            name="firstname"
            label="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            fullWidth
          />
          {/* Ajoutez d'autres champs ici */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={handleSubmit}>
              Enregistrer
            </Button>
            <Button variant="contained" onClick={onClose}>
              Annuler
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
