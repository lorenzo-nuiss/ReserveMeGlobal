import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";

const StyledItemCaroussel = styled(Card)`
  /* Vos styles CSS personnalisés ici */
  background-color: #f0f0f0;
  padding: 20px;
  width: 40%;
`;
const FlexItem = styled("div")`
  max-width: 750px;
  width: 100%;
`;

const ItemCaroussel = (props: {
  item: {
    name: string;
    description: string;
    date: string;
    rating: number;
    img: string;
  };
}) => {
  const imagePath = "./" + props.item.img + ".jpg";
  return (
    // <Paper square={false} elevation={3} sx={{ p: 4 }}>
    //   <h2>{props.item.name}</h2>
    //   <p>{props.item.description}</p>
    // </Paper>
    <Card
      elevation={3}
      sx={{
        position: "relative",
        p: 3,
        boxShadow: "none",
        borderRadius: "10px",
        maxWidth: "750px",
        width: "100%",
        "&:hover": {
          cursor: "grab",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={imagePath}
            alt="User Avatar"
            sx={{ width: 60, height: 60 }}
          />
        }
        title={props.item.name}
        subheader={props.item.date}
        sx={{ pb: 1 }}
      />
      <CardContent>
        <Typography
          sx={{ mb: 2, pd: 1 }}
          variant="body1"
          color="textSecondary"
          fontStyle="italic"
        >
          "{props.item.description}"
        </Typography>
        <Rating
          name="review-rating"
          value={props.item.rating}
          readOnly
          sx={{ color: "#FFD100" }}
        />
      </CardContent>
      <FormatQuoteOutlinedIcon
        sx={{
          position: "absolute",
          color: "rgba(255, 209, 0,0.3)",
          fontSize: 150,
          bottom: 1, // Ajustez la position verticale en fonction de vos besoins.
          right: 23, // Ajustez la position horizontale en fonction de vos besoins.
        }}
      />
    </Card>
  );
};

export default ItemCaroussel;
