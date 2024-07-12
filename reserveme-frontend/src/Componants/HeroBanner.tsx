import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useReservationModal } from "../services/ReservationModalProvider";

const StyledBox = styled(Box)`
  background-image: linear-gradient(to bottom, #1a1a1a, rgb(26 26 26 / 0)),
    url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"); // Remplacez 'your-image.jpg' par le chemin de votre image
  background-size: cover;
  background-position: center;
  color: #fff; // Couleur du texte
  padding: ${(props) => props.theme.spacing(6)}px;
  text-align: center;
  display: flex;
  align-items: center;
  height: 97vh;
`;
// background-image: linear-gradient(to bottom,#1A1A1A , rgb(26 26 26 / 0));

const HeroBanner = () => {
  const { openModal } = useReservationModal();

  return (
    <StyledBox>
      <Container
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          Bienvenue sur notre site web
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Découvrez nos produits et services exceptionnels.
        </Typography>
        <Typography variant="body2">
          Nous sommes là pour répondre à tous vos besoins.
        </Typography>
        <Button
          sx={{ mt: 4, px: 4.2, py: 1.5 }}
          onClick={openModal}
          variant="contained"
        >
          Réserver
        </Button>
      </Container>
    </StyledBox>
  );
};

export default HeroBanner;
