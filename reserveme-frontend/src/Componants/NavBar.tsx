import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  Link,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AuthService from "./management/AuthService";
import { useReservationModal } from "../services/ReservationModalProvider";

// Styles personnalisés pour la navbar
const StyledAppBar = styled(AppBar)`
  background-color: transparent;
  backdrop-filter: none;
  transition: background-color 0.3s;
  -webkit-backdrop-filter: none;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  height: 13%;
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const { openModal } = useReservationModal(); //

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if (currentUser) {
        listPages.push({
          title: "Admin",
          path: "/dashboard/app",
        });
      }
    }
  }, []);

  const listPages: { title: string; path: string }[] = [
    {
      title: "Carte",
      path: "/menu",
    },

    {
      title: "Profil",
      path: "/contact",
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const btnReserve = () => {
    handleCloseNavMenu();
    openModal();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        backgroundColor: isScrolled ? "rgba(106, 91, 110, 0.3)" : "transparent",
        backdropFilter: isScrolled ? "blur(7px)" : "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeRoundedIcon
            sx={{ display: { xs: "none", md: "flex", color: "#fff" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Ô Bistrot
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link onClick={openModal}>
                  <Typography textAlign="center">Réservation</Typography>
                </Link>
              </MenuItem>
              {listPages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link href={page.path}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HomeRoundedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Ô Bistrot
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              onClick={btnReserve}
              sx={{
                my: 2,
                mx: 2,
                px: 3,
                py: 1,
                color: "white",
                display: "block",
              }}
            >
              Réserver
            </Button>
            {listPages.map((page) => (
              <Button
                href={page.path}
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 2,
                  px: 3,
                  py: 1,
                  color: "white",
                  display: "block",
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
