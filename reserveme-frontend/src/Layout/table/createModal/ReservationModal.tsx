import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material/Select";

import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { FormData } from "../../../Type/UserData";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { createReservation } from "../../../Componants/management/ReservationManagement";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateReservationList: () => void;
  showAlert: () => void;
}
const ReservationModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  updateReservationList,
  showAlert,
}) => {
  const initialFormData: FormData = {
    date: dayjs().toISOString(),
    civilite: "MONSIEUR",
    firstname: "",
    lastname: "",
    guests: 2,
    notes: "",
    phoneNumber: "01",
    status: "",
    email: "",
  };
  dayjs.extend(utc);
  dayjs.extend(tz);

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleClose = () => {
    onClose();
  };

  const mutation = useMutation({ mutationFn: createReservation });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    console.log(formData.date);
    console.log(typeof formData.date);

    mutation.mutate(formData, {
      onSuccess: () => {
        // Appeler la fonction de mise à jour de la liste des réservations
        updateReservationList();
        // Fermez le modal (si nécessaire)
        showAlert();
        onClose();
      },
    });
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
    field: string
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleChangeDate = (newDate: any | null, field: string) => {
    if (newDate !== null) {
      const formattedDate = dayjs(newDate).format("YYYY-MM-DDTHH:mm:ss+02:00");
      const dateF = new Date(formattedDate);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: dateF,
      }));
    }
  };

  if (mutation.isPending) return "Chargement..";

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
      <DialogTitle>Enregistrer une réservation</DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        {/* Formulaire de modification */}
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={onSubmit} className="formDatePicker">
            <Grid container spacing={3} py={1}>
              <Grid xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    label="Date"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#1976d2 !important", // Couleur de la bordure
                        },
                        "& .MuiInputLabel-root.Mui-error": {
                          color: "#1976d2 !important", // Couleur du label
                        },
                        "&:hover fieldset": {
                          borderColor: "#1976d2", // Couleur de la bordure au survol
                        },
                      },
                    }}
                    disablePast
                    value={dayjs(formData.date)}
                    slotProps={{ textField: { color: "primary2" } }}
                    onChange={(newvalue) => handleChangeDate(newvalue, "date")}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="First Name"
                  color="primary2"
                  variant="outlined"
                  value={formData.firstname}
                  onChange={(e) => handleChange(e, "firstname")}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Last Name"
                  color="primary2"
                  variant="outlined"
                  value={formData.lastname}
                  onChange={(e) => handleChange(e, "lastname")}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Guests"
                  color="primary2"
                  variant="outlined"
                  value={formData.guests}
                  onChange={(e) => handleChange(e, "guests")}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Notes"
                  color="primary2"
                  variant="outlined"
                  value={formData.notes}
                  onChange={(e) => handleChange(e, "notes")}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Numéro de téléphone"
                  color="primary2"
                  variant="outlined"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange(e, "phoneNumber")}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-name-label">Status</InputLabel>

                  <Select
                    labelId="demo-multiple-name-label"
                    fullWidth
                    value={formData.status || ""}
                    input={<OutlinedInput label="Status" />}
                    onChange={(e) => handleChange(e, "status")}
                  >
                    <MenuItem value={"En attente"}>En attente</MenuItem>
                    <MenuItem value={"Accepté"}>Accepté</MenuItem>
                    <MenuItem value={"Refusé"}>Refusé</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  color="primary2"
                  variant="outlined"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
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
                  Enregistrer
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
