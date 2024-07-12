import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import AuthService from "./management/AuthService";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  "& .MuiDrawer-paperClose": {
    width: theme.spacing(7),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const NavbarAdmin = () => {
  const theme = useTheme();

  return (
    <StyledDrawer variant="permanent">
      <Box py={3} pl={"16px"}>
        <HomeRoundedIcon
          sx={{ display: { xs: "none", md: "flex", color: "#fff" } }}
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
          }}
          color={"primary"}
        >
          Ô Bistrot
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemText primary="Accueil" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Réservations" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Menus" />
        </ListItemButton>
        <ListItemButton onClick={AuthService.logout}>
          <ListItemText primary="Déconnexion" />
        </ListItemButton>
        {/* Ajoutez d'autres éléments de menu ici */}
      </List>
    </StyledDrawer>
  );
};

export default NavbarAdmin;
