import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Container,
  TextField,
  FormLabel,
  Grid,
  Box,
  Pagination,
  Typography,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { formatInTimeZone } from "date-fns-tz";

import ScheduleSendRoundedIcon from "@mui/icons-material/ScheduleSendRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  ReservationFormType,
  ReservationFormTypeDate,
} from "../Type/ReservationData";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@tanstack/react-query";

import CloseIcon from "@mui/icons-material/Close";
import { createReservation } from "./management/ReservationManagement";
import { useReservationModal } from "../services/ReservationModalProvider";

export const generateLunchTimes = (startTime: string, endTime: string) => {
  const lunchTimes: string[] = [];
  let currentTime: string = startTime;

  while (currentTime < endTime) {
    lunchTimes.push(currentTime);
    const [hours, minutes] = currentTime.split(":");
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + 15;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    currentTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  }

  return lunchTimes;
};

const initialFormData: ReservationFormType = {
  date: dayjs().toISOString(),
  civilite: "MONSIEUR",
  firstname: "",
  lastname: "",
  email: "",
  notes: "",
  phoneNumber: "",
  guests: 2,
};
const currentDate = new Date().toISOString().split("T")[0];

const buttonsPerPage = 12;
const startTime: string = "12:00";
const endTime: string = "18:00";
const startTimeDiner: string = "18:00";
const endTimeDiner: string = "22:00";

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageDiner, setCurrentPageDiner] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLunchTime, setSelectedLunchTime] = useState<string | null>(
    null
  );
  const [selectedDinerTime, setSelectedDinerTime] = useState<string | null>(
    null
  );
  const { isModalOpen, closeModal } = useReservationModal(); // Utilisez le contexte pour déterminer si le modal doit être ouvert ou fermé

  const [formData, setFormData] =
    useState<ReservationFormType>(initialFormData);

  useEffect(() => {
    updateSelectedTime(selectedLunchTime, selectedDinerTime);
  }, [selectedLunchTime, selectedDinerTime]);

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    email: "",
    phoneNumber: "",
  });

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleLunchTimeChange = (time: string) => {
    setSelectedLunchTime(time);
    setStep(2);
  };
  const handleDinerTimeChange = (time: string) => {
    setSelectedDinerTime(time);
    setStep(2);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const updateSelectedTime = (
    lunchTime: string | null,
    dinerTime: string | null
  ) => {
    if (lunchTime) {
      setSelectedTime(lunchTime);
    } else if (dinerTime) {
      setSelectedTime(dinerTime);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate || selectedDate == "") {
      setErrors({ ...errors, date: "Vous n'avez pas séléctionné de date." });
      setStep(1);
    } else {
      const dateStr = selectedDate;
      const timeStr = selectedTime;

      const [day, month, year] = dateStr.split("/");
      const formattedISODate = `${year}-${month}-${day}`;

      const combinedDateTimeStr = `${formattedISODate}T${timeStr}:00Z`;

      // Convertissez la chaîne de caractères en objet Date
      const combinedDateTime = new Date(combinedDateTimeStr);

      // Formatez la date et l'heure en utilisant le fuseau horaire de Paris
      const formattedDateTime = formatInTimeZone(
        combinedDateTime,
        "Europe/Paris",
        "yyyy-MM-dd HH:mm:ssXXX"
      );

      const formatedDate = new Date(formattedDateTime);

      setFormData((prevFormData) => ({
        ...prevFormData,
        ["date"]: formattedDateTime,
      }));

      const updatedFormData: ReservationFormTypeDate = {
        ...formData,
        date: formatedDate,
      };

      mutation.mutate(updatedFormData, {
        onSuccess: () => {
          setSubmitSuccess(true);
          setStep(3);
        },
        onError: () => {},
      });
    }
  };
  const mutation = useMutation({ mutationFn: createReservation });

  const lunchTimes: string[] = generateLunchTimes(startTime, endTime);

  const dinerTimes: string[] = generateLunchTimes(startTimeDiner, endTimeDiner);

  const lunchButtonsChunks = Array.from(
    { length: Math.ceil(lunchTimes.length / buttonsPerPage) },
    (_, index) =>
      lunchTimes.slice(index * buttonsPerPage, (index + 1) * buttonsPerPage)
  );

  const dinerButtonsChunks = Array.from(
    { length: Math.ceil(dinerTimes.length / buttonsPerPage) },
    (_, index) =>
      dinerTimes.slice(index * buttonsPerPage, (index + 1) * buttonsPerPage)
  );

  const handleDateChange = (
    date: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({ ...errors, date: "" });

    const newDate = new Date(date.target.value);
    const formattedDate2 = newDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setSelectedDate(formattedDate2);
  };

  const formatDateForTextField = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm">
      <Container sx={{ p: 2 }}>
        <Box p={2}>
          <DialogTitle variant="h6" gutterBottom sx={{ padding: 0 }}>
            {step === 1
              ? "Réservez une table"
              : step === 2
              ? "Vos informations"
              : "Votre réservation est en attente !"}
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre de personnes"
                      type="number"
                      value={formData.guests}
                      onChange={(e) => handleChange(e, "guests")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="en-gb"
                  >
                    <DatePicker
                      disablePast
                      value={null}
                      onChange={handleDateChange}
                      label="Date de réservation"
                      slotProps={{
                        textField: {
                          helperText: "DD/MM/YYYY",
                        },
                      }}
                    />
                  </LocalizationProvider> */}

                    <TextField
                      label="Date de réservation"
                      required
                      type="date"
                      value={formatDateForTextField(selectedDate)}
                      //   value={
                      //     !selectedDate
                      //       ? currentDate
                      //       : formatDateForTextField(selectedDate)
                      //   }

                      error={Boolean(errors.date)}
                      helperText={errors.date}
                      onChange={(e) => handleDateChange(e)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: currentDate }}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Typography sx={{ mt: 3 }} variant="body2">
                  DEJEUNER
                </Typography>

                {lunchButtonsChunks[currentPage - 1].map((time, index) => (
                  <Button
                    key={index}
                    variant={"contained"}
                    sx={{ m: 0.8, boxShadow: "none" }}
                    onClick={() => handleLunchTimeChange(time)}
                  >
                    {time}
                  </Button>
                ))}

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Pagination
                    sx={{ mt: 1 }}
                    count={lunchButtonsChunks.length}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                  />
                </Box>

                <Typography sx={{ mt: 3 }} variant="body2">
                  DINER
                </Typography>

                {dinerButtonsChunks[currentPageDiner - 1].map((time, index) => (
                  <Button
                    key={index}
                    variant={"contained"}
                    sx={{ m: 0.8, boxShadow: "none" }}
                    onClick={() => handleDinerTimeChange(time)}
                  >
                    {time}
                  </Button>
                ))}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Pagination
                    sx={{ mt: 1, textAlign: "right" }}
                    count={dinerButtonsChunks.length}
                    page={currentPageDiner}
                    onChange={(event, page) => setCurrentPageDiner(page)}
                  />
                </Box>
              </div>
            )}

            {step === 2 && (
              <div>
                <Grid container spacing={2} mt={1} rowSpacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Prenom"
                      required
                      value={formData.firstname}
                      onChange={(e) => handleChange(e, "firstname")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nom"
                      required
                      value={formData.lastname}
                      onChange={(e) => handleChange(e, "lastname")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel id="demo-customized-radios">Civilité</FormLabel>

                    <RadioGroup
                      row
                      aria-label="civilite"
                      name="civilite"
                      value={formData.civilite}
                      onChange={(e) => handleChange(e, "civilite")}
                    >
                      <FormControlLabel
                        value="MONSIEUR"
                        control={<Radio size="small" />}
                        label="Monsieur"
                      />
                      <FormControlLabel
                        value="MADAME"
                        control={<Radio size="small" />}
                        label="Madame"
                      />
                    </RadioGroup>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e, "email")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      label="Numéro de téléphone"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange(e, "phoneNumber")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Notes"
                      value={formData.notes}
                      onChange={(e) => handleChange(e, "notes")}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <IconButton
                      aria-label="backStep"
                      onClick={handleBack}
                      sx={{ textTransform: "none", mr: 4 }}
                    >
                      <ArrowBackRoundedIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: "none", px: 3 }}
                      type="submit"
                      endIcon={<ScheduleSendRoundedIcon />}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? <CircularProgress /> : "Réserver"}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
            {step === 3 && (
              <div>
                <Grid container spacing={2} mt={1} rowSpacing={5}>
                  <Alert severity="success">
                    Un message de confirmation sera envoyé à votre adresse
                    e-mail ou sur votre téléphone.
                  </Alert>
                </Grid>
              </div>
            )}
          </form>
        </Box>
      </Container>
    </Dialog>
  );
}
