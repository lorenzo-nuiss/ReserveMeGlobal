import { Box, Typography, Grid } from "@mui/material";

interface PresentationProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Presentation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      py={12}
    >
      <Grid
        container
        spacing={6}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, textAlign: "left" }}>
            <Typography variant="h6" className="txtLight">
              Qui sommes nous ?
            </Typography>
            <Typography
              variant="h3"
              gutterBottom
              pb={1}
              sx={{ fontWeight: 500 }}
              color="textPrimary"
            >
              Bienvenue à Ô Bistrot
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Nous sommes fiers de vous accueillir au cœur de Paris, où notre
              cuisine française traditionnelle fusionne harmonieusement avec des
              touches contemporaines. Nos plats emblématiques tels que le steak
              frites, la soupe à l'oignon, la ratatouille, la tarte tatin et la
              crème brûlée reflètent notre engagement envers la qualité et la
              tradition.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Notre restautant, à l'ambiance chic et décontractée, offre
              également une vue imprenable sur la Tour Eiffel, créant ainsi une
              expérience gastronomique inoubliable. Venez partager des moments
              exquis avec nous à Ô Bistrot.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            p: "10",
            justifyContent: "center",
          }}
        >
          <img
            src="./valentin-b-kremer-4ia_6JMu6Mg-unsplash.jpg"
            alt="Présentation"
            style={{
              maxWidth: "80%",
              height: "auto",
              borderRadius: "15px",
              boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.16)",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Presentation;
