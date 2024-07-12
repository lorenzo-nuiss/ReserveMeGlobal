import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}
export const TabPanelMenuItem = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Grid container bgcolor={"secondary"} spacing={2}>
          {children}
        </Grid>
      )}
    </div>
  );
};
