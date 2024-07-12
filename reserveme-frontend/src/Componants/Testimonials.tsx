import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ItemCaroussel from "./ItemCaroussel";
import { styled } from "@mui/material/styles";
import Title from "./Title";

// const StyledItemCaroussel = styled(ItemCaroussel)`
//   /* Vos styles CSS personnalisés ici */
//   background-color: #f0f0f0;
//   padding: 20px;
//   width: 40%;
// `;
const FlexContainer = styled("div")`
  display: flex;
  gap: 4%;
  justify-content: space-between; // Pour espacer les éléments
`;

const Testimonials = () => {
  var items = [
    [
      {
        name: "Random Name #1",
        description:
          "J'ai adoré ma soirée à Ô Bistrot. La vue sur la Tour Eiffel était à couper le souffle, et les plats, comme le steak-frites, étaient divins. Le personnel était sympathique et attentif. Je reviendrai sans hésiter.",
        date: "21/09/2023",
        rating: 4,
        img: "portrait1",
      },
      {
        name: "Random Name #2",
        description:
          "Ô Bistrot offre une expérience gastronomique exceptionnelle. Les plats français traditionnels sont préparés avec une touche moderne. L'ambiance est chaleureuse et l'emplacement avec vue sur la Tour Eiffel ajoute au charme.",
        date: "17/09/2023",
        rating: 5,
        img: "portrait2",
      },
    ],
    [
      {
        name: "Random Name #3",
        description:
          "Ce restaurant est un paradis pour les amateurs de cuisine végétarienne. Les plats sont savoureux, et l'ambiance décontractée en fait un choix idéal pour les dîners en groupe. Le personnel est sympathique et le service est excellent.",
        date: "01/06/2023",
        rating: 4,
        img: "portrait3",
      },
      {
        name: "Random Name #4",
        description:
          "J'ai passé une soirée agréable à Ô Bistrot. La cuisine était bonne, mais je m'attendais à un peu plus d'originalité. Le service était correct, mais il y avait de la place pour une amélioration. Dans l'ensemble, une expérience sympathique.",
        date: "14/07/2023",
        rating: 5,
        img: "portrait2",
      },
    ],
    [
      {
        name: "Random Name #3",
        description:
          "Ce restaurant est un paradis pour les amateurs de cuisine végétarienne. Les plats sont savoureux, et l'ambiance décontractée en fait un choix idéal pour les dîners en groupe. Le personnel est sympathique et le service est excellent.",
        date: "21/08/2023",
        rating: 4,
        img: "portrait1",
      },
    ],
  ];

  var items2 = [
    {
      name: "Random Name #1",
      description:
        "J'ai adoré ma soirée à Ô Bistrot. La vue sur la Tour Eiffel était à couper le souffle, et les plats, comme le steak-frites, étaient divins. Le personnel était sympathique et attentif. Je reviendrai sans hésiter.",
      date: "21/09/2023",
      rating: 4,
      img: "portrait1",
    },
    {
      name: "Random Name #2",
      description:
        "Ô Bistrot offre une expérience gastronomique exceptionnelle. Les plats français traditionnels sont préparés avec une touche moderne. L'ambiance est chaleureuse et l'emplacement avec vue sur la Tour Eiffel ajoute au charme.",
      date: "17/09/2023",
      rating: 5,
      img: "portrait2",
    },
    {
      name: "Random Name #3",
      description:
        "Ce restaurant est un paradis pour les amateurs de cuisine végétarienne. Les plats sont savoureux, et l'ambiance décontractée en fait un choix idéal pour les dîners en groupe. Le personnel est sympathique et le service est excellent.",
      date: "01/06/2023",
      rating: 4,
      img: "portrait3",
    },
    {
      name: "Random Name #4",
      description:
        "J'ai passé une soirée agréable à Ô Bistrot. La cuisine était bonne, mais je m'attendais à un peu plus d'originalité. Le service était correct, mais il y avait de la place pour une amélioration. Dans l'ensemble, une expérience sympathique.",
      date: "14/07/2023",
      rating: 5,
      img: "portrait2",
    },
  ];

  return (
    <>
      <Box sx={{ pt: 12, pb: 12, display: { xs: "none", md: "block" } }}>
        <Title title="Ce que dises nos clients" subtitle="Avis client" />
        <Carousel
          animation="slide"
          autoPlay={false}
          duration={100}
          indicatorContainerProps={{
            style: {
              marginTop: "50px", // 5
            },
          }}
        >
          {items.map((itemPair, i) => (
            <FlexContainer key={i}>
              {itemPair.map((item, j) => (
                <ItemCaroussel key={j} item={item} />
              ))}
            </FlexContainer>
          ))}
        </Carousel>
      </Box>

      <Box sx={{ pt: 12, pb: 4, display: { xs: "block", md: "none" } }}>
        <Carousel
          animation="slide"
          autoPlay={false}
          duration={100}
          indicatorContainerProps={{
            style: {
              marginTop: "50px", // 5
            },
          }}
        >
          {items2.map((item, j) => (
            <ItemCaroussel key={j} item={item} />
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default Testimonials;
