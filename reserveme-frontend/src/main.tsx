import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { yellow } from "@mui/material/colors";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

declare module "@mui/material/styles" {
  interface Palette {
    primary2: Palette["primary"];
  }

  interface PaletteOptions {
    primary2?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary2: true;
  }
}
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    primary2: true;
  }
}
declare module "@mui/material/Tabs" {
  interface TabsPropsTextColorOverrides {
    primary2: true;
  }
}
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    primary2: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[600],
      light: yellow[500],
      dark: yellow[700],
      contrastText: "#333533",
    },
    secondary: {
      main: "#ff9900", // Couleur secondaire
      light: "#fff",
      dark: "#333533",
      contrastText: "#fff",
    },
    primary2: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    text: {
      primary: "#332F1D", // Couleur du texte principal
    },
    // Vous pouvez également personnaliser d'autres couleurs ici, comme 'error', 'warning', etc.
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
