import React from "react";
import { styled } from "@mui/material/styles";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Hidden from "@mui/material/Hidden";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

const Accessibility = () => {
  const dataOpen = [
    {
      day: "lundi",
      hours: "ferme",
    },
    {
      day: "mardi",
      hours: "10h - 20h ",
    },
    {
      day: "mercredi",
      hours: "10h - 20h ",
    },
    {
      day: "jeudi",
      hours: "10h - 20h ",
    },
    {
      day: "vendredi",
      hours: "10h - 20h ",
    },
    {
      day: "samedi",
      hours: "10h - 20h ",
    },
    {
      day: "dimanche",
      hours: "ferme ",
    },
  ];

  const ContactCard = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 110px;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.05);
  `;
  const MyGrid = styled(Grid)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); 
    ); /* Largeur minimale de 135px par colonne */
    gap: 16px; /* Espace entre les éléments */
    width:100%;
    padding-top:20px;
  `;

  return (
    <Grid
      container
      //   spacing={2}
      //   columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ justifyContent: "center" }}
      columnGap={8}
      py={12}
    >
      <Grid
        container
        position={"relative"}
        xs={12}
        md={6}
        lg={6}
        className={"card_hours"}
        rowGap={2}
        sx={{ py: 5, maxWidth: 550, backgroundColor: "Theme" }}
      >
        <RestaurantMenuRoundedIcon
          sx={{
            position: "absolute",
            color: "#fff",
            opacity: 0.5,
            fontSize: "350px",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
            zIndex: 2,
          }}
        />
        <Grid xs={12} sx={{ textAlign: "center", zIndex: 3 }}>
          <Typography align="center" variant="h5" gutterBottom>
            Horraires d'ouverture:
          </Typography>
        </Grid>

        {dataOpen.map((item, index) => (
          <React.Fragment key={index}>
            <Grid sm={4} xs={6} sx={{ textAlign: "center", zIndex: 4 }}>
              {item.day}
            </Grid>
            <Hidden xsDown>
              <Grid
                sm={4}
                xs={0}
                sx={{
                  textAlign: "center",
                  zIndex: 5,
                  display: { xs: "none", sm: "block" },
                }}
              >
                -----------
              </Grid>
            </Hidden>

            <Grid sm={4} xs={6} sx={{ textAlign: "center", zIndex: 6 }}>
              {item.hours}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Grid xs={12} md>
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          sx={{ height: "100%", justifyContent: "center" }}
          spacing={3}
        >
          {/* Titre */}
          <Grid xs={12} md={12}>
            <Typography
              variant="h3"
              align="center"
              color="textPrimary"
              fontWeight={500}
            >
              Infos pratiques
            </Typography>
          </Grid>

          {/* Phrase */}
          <Grid xs={12} sx={{ width: "100%" }}>
            <Typography variant="body1" align="center" gutterBottom>
              Moyens d’accès : RER D sortie Alfortville / Bus 102,64 / métro 4
              sortie Cité
            </Typography>
          </Grid>

          {/* --------------------- CARD ---------------------*/}
          <MyGrid xs={12}>
            <div>
              <ContactCard>
                <EmailIcon fontSize="large" color="primary" />
                <Typography variant="body2" pt={1}>
                  contact@obistrot.com
                </Typography>
              </ContactCard>
            </div>

            {/* Carte avec numéro de téléphone */}
            <div>
              <ContactCard>
                <PhoneIcon fontSize="large" color="primary" />
                <Typography variant="body2" pt={1}>
                  +33 123 456 789
                </Typography>
              </ContactCard>
            </div>

            {/* Carte avec la position */}
            <div>
              <ContactCard>
                <LocationOnIcon fontSize="large" color="primary" />
                <Typography variant="body2" pt={1}>
                  123 Rue du Restaurant, 75000 Paris
                </Typography>
              </ContactCard>
            </div>
          </MyGrid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Accessibility;
