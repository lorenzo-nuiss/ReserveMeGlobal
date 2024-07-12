import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const itemData = [
  {
    img: "anh-nguyen-kcA-c3f_3FE-unsplash.jpg",
  },
  {
    img: "chad-montano-MqT0asuoIcU-unsplash.jpg",
  },
  {
    img: "davide-cantelli-jpkfc5_d-DI-unsplash.jpg",
  },
  {
    img: "emy-XoByiBymX20-unsplash.jpg",
  },
  {
    img: "joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg",
  },
  {
    img: "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
  },
  {
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1508170754725-6e9a5cfbcabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

const itemData2 = [
  {
    col1Row1: "data",
    col1Row2: "data",
    col1Row3: "data",
  },
  {
    col2Row1: "data",
    col2Row2: "data",
    col2Row3: "data",
  },
  {
    img: "chad-montano-MqT0asuoIcU-unsplash.jpg",
  },
  {
    img: "davide-cantelli-jpkfc5_d-DI-unsplash.jpg",
  },
  {
    img: "emy-XoByiBymX20-unsplash.jpg",
  },
  {
    img: "joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg",
  },
  {
    img: "joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg",
  },
  {
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1508170754725-6e9a5cfbcabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
];

const Gallery = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const columns = isLargeScreen ? 4 : 2; // Définissez le nombre de colonnes en fonction de la taille de l'écran
  const rowHeight = isLargeScreen ? 264 : 132; // Définissez la hauteur de la ligne en fonction de la taille de l'écran

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Title title="Quelques photos de nos plats" subtitle="Découvrez" />
      {/* <Grid container spacing={{ xs: 2, md: 3 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid> */}
      <ImageList
        variant="masonry"
        cols={columns}
        gap={14}
        rowHeight={rowHeight}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              className="img_radius"
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt="plats-cuisine"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default Gallery;
