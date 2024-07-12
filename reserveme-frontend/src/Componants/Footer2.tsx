import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterContainer = styled("footer")`
  background-color: #383320;
  color: white;
  padding: 24px 0;
  text-align: center;
`;

const FooterContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-height: 220px;
  .logo {
    flex: 1;
    text-align: left;
  }

  .social-icons {
    flex: 1;
    display: flex;
    justify-content: center;

    a {
      color: white;
      margin: 0 8px;
      transition: color 0.3s;

      &:hover {
        color: #ff9900;
      }
    }
  }

  .copyright {
    flex: 1;
    text-align: right;
    margin-top: 16px;
  }
`;

const Footer = () => {
  const socialIcons = [
    { icon: <FacebookIcon />, link: "https://www.facebook.com/" },
    { icon: <TwitterIcon />, link: "https://twitter.com/" },
    { icon: <InstagramIcon />, link: "https://www.instagram.com/" },
  ];

  return (
    <FooterContainer sx={{ position: "relative" }}>
      <svg
        className="editorial"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          />
        </defs>
        <g className="parallax4">
          <use xlinkHref="#gentle-wave" x="50" y="6" fill="#383320" />
        </g>
      </svg>

      <FooterContent maxWidth="lg">
        <div className="logo">
          <Typography variant="h6">Ô Bistrot</Typography>
        </div>
        <div className="social-icons">
          {socialIcons.map((social, index) => (
            <IconButton
              key={index}
              component="a"
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </IconButton>
          ))}
        </div>
        <div className="copyright">
          <Typography variant="body2">
            © {new Date().getFullYear()} Ô Bistrot. Tous droits réservés.
          </Typography>
        </div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
