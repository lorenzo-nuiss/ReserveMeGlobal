import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import NavBarDashboard from "./NavBarDashboard";
import Header from "./header";
import { useTheme } from "@mui/material/styles";
import { Navigate } from "react-router-dom";

import { useMediaQuery } from "@mui/material";
import { isTokenExpired } from "./ProtectedRoute";
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "rgb(238, 242, 246)",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100vh",
  paddingTop: APP_BAR_MOBILE,

  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: 0,
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: APP_BAR_MOBILE + 24,
  },
}));

// ----------------------------------------------------------------------
// const currentUser = isTokenExpired;

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [userExpired, setUserExpired] = useState(false);

  const theme = useTheme();
  useEffect(() => {
    setUserExpired(isTokenExpired);
    // si le token est pas expiré pass
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  {
    return userExpired ? (
      <Navigate to="/connexion" replace={true} />
    ) : (
      <StyledRoot>
        {isMobile ? (
          /* Affiche le Header uniquement si isMobile est vrai */
          <Header onOpenNav={() => setOpen(true)} />
        ) : null}
        <NavBarDashboard openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    );
  }
}
