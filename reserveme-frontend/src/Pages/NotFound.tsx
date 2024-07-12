import { Box, Container, Button, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../public/animation_lnx1rm9w.json";

// import animationData from 'animation_lnx1rm9w.json';

export const NotFound = () => {
  return (
    <>
      <Container
        sx={{ width: "100%", backgroundColor: "#332F1D" }}
        maxWidth={"100%"}
      >
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ mb: 3 }}
            color={"secondary.contrastText"}
            mt={2}
          >
            Page non trouvée !
          </Typography>

          <Typography sx={{ color: "#BDB8AA" }} m={0}>
            Désolé, nous n'avons pas pu trouver la page que vous recherchez.
            Peut-être avez-vous fait une erreur dans l'URL ? Assurez-vous de
            vérifier votre orthographe.
          </Typography>

          <Box sx={{ my: -5 }}>
            <Lottie
              animationData={animationData} // Remplacez par le chemin de votre fichier JSON d'animation
              loop
              autoplay
              style={{ width: "400px", height: "400px" }}
            />
          </Box>

          <Button
            href="/"
            size="large"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Page d'accueil
          </Button>
        </Box>
      </Container>
    </>
  );
};
