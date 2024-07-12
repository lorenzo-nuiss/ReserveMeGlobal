import HeroBanner from "../Componants/HeroBanner";
import { Container } from "@mui/system";
import Testimonials from "../Componants/Testimonials";
import { styled } from "@mui/material/styles";
import Gallery from "../Componants/Gallery";
import Presentation from "../Componants/Presentation";
import Accessibility from "../Componants/Accessibility";
import Footer2 from "../Componants/Footer2";
import AuthService from "../Componants/management/AuthService";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();

  const LargeDiv = styled("div")`
    width: 100%;
    background-color: #ebe9e4;
  `;
  return (
    <>
      <HeroBanner></HeroBanner>
      <Container maxWidth="lg">
        <Presentation />
      </Container>

      <LargeDiv>
        <Container maxWidth="lg">
          <Gallery />
        </Container>
      </LargeDiv>

      <Container maxWidth="lg">
        <Accessibility />
      </Container>
      <LargeDiv>
        <Container maxWidth="lg">
          <Testimonials />
        </Container>
      </LargeDiv>
      <Footer2 />
    </>
  );
};

export default Home;
