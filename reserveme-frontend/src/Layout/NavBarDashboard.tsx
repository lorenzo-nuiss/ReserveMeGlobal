import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Drawer, Typography } from "@mui/material";
// hooks
// components
import NavSectionAdmin from "../Componants/NavSectionAdmin";

import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { useMediaQuery } from "@mui/material";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

interface NavBarDashboardProps {
  openNav: boolean;
  onCloseNav: () => void; // La fonction de fermeture de la navigation
}

export default function NavBarDashboard({
  openNav,
  onCloseNav,
}: NavBarDashboardProps) {
  const { pathname } = useLocation();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Link
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <HomeRoundedIcon sx={{ mr: 1 }} /> Ô Bistrot
        </Link>
      </Box>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link href="/dashboard/app" underline="none">
          <StyledAccount>
            <DashboardRoundedIcon color="secondary" sx={{ mr: 3 }} />

            <Typography variant="subtitle2" color="secondary">
              Dashboard
            </Typography>
          </StyledAccount>
        </Link>
      </Box>
      <NavSectionAdmin />
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isMobile ? (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "none",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
