import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminPageContainer = styled("div")(({ theme }) => ({
  backgroundColor: "rgb(250, 248, 242)",
  padding: theme.spacing(3),
  width: "100%",
  margin: 0,
}));

const AdminCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  boxShadow: "0px 0px 26px 0px rgba(0, 0, 0, 0.2)",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const ReservationInfo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ActionButtons = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  "& button": {
    marginRight: theme.spacing(2),
  },
}));
const AdminHome = () => {
  // Exemple de données pour les réservations en cours
  const reservations = [
    {
      civilite: "M.",
      date: "2023-09-15",
      date_expiration: "2023-09-20",
      firstname: "John",
      guests: 2,
      lastname: "Doe",
      notes: "Préférence pour une table près de la fenêtre.",
      phone_number: "123-456-7890",
      status: "En attente",
      email: "john@example.com",
    },
    // Ajoutez d'autres réservations ici...
  ];

  // Exemple de données pour les notifications
  const notifications = [
    {
      id: 1,
      message: "Nouvelle réservation reçue.",
    },
    {
      id: 2,
      message: "Confirmation d'une réservation.",
    },
    // Ajoutez d'autres notifications ici...
  ];

  return (
    <AdminPageContainer>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Tableau de bord administrateur
      </Typography>

      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid item xs={12} md={6}>
          <AdminCard>
            <CardTitle>Réservations en cours</CardTitle>
            {reservations.map((reservation, index) => (
              <div key={index}>
                <ReservationInfo>
                  {reservation.firstname} {reservation.lastname}
                </ReservationInfo>
                <ReservationInfo>Date : {reservation.date}</ReservationInfo>
                <ReservationInfo>
                  Nombre d'invités : {reservation.guests}
                </ReservationInfo>
                <ReservationInfo>Statut : {reservation.status}</ReservationInfo>
                <ActionButtons>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EmailIcon />}
                  >
                    Accepter
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Supprimer
                  </Button>
                </ActionButtons>
              </div>
            ))}
          </AdminCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <AdminCard>
            <CardTitle>Notifications</CardTitle>
            {notifications.map((notification, index) => (
              <div key={index}>
                <Typography variant="body1">{notification.message}</Typography>
              </div>
            ))}
          </AdminCard>
        </Grid>
      </Grid>
    </AdminPageContainer>
  );
};

export default AdminHome;
