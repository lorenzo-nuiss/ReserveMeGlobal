import { NavLink as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// @mui
import { Box, List, ListItemText, Button } from "@mui/material";
//
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
  StyledNavItem,
  StyledNavItemIcon,
} from "../Style/NavSectionAdminStyle";
import AuthService from "./management/AuthService";
// ----------------------------------------------------------------------

interface NavItemProps {
  item: { title: string; path: string }; // Définissez ici la structure de votre objet item
}

const listNav: { title: string; path: string }[] = [
  {
    title: "Carte",
    path: "/dashboard/carte",
  },
  {
    title: "Résérvations",
    path: "/dashboard/user",
  },
  {
    title: "Profil",
    path: "/contact",
  },
];

export default function NavSectionAdmin() {
  const navigate = useNavigate();

  const logoutFn = () => {
    AuthService.logout;
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {listNav.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
      <Button
        variant="outlined"
        color="secondary"
        onClick={logoutFn}
        startIcon={<LogoutRoundedIcon />}
        sx={{ textTransform: "none", ml: 5, mt: 3 }}
      >
        Déconnexion
      </Button>
    </Box>
  );
}

function NavItem({ item }: NavItemProps) {
  const { title, path } = item;

  return (
    <StyledNavLink component={RouterLink} to={path}>
      <StyledNavItemIcon>
        <ArrowForwardRoundedIcon />
      </StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />{" "}
    </StyledNavLink>
  );
}
const StyledNavLink = (props: any) => {
  return <StyledNavItem {...props} component="div" />;
};
