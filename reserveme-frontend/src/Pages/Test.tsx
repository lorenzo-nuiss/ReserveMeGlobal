import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllReservation } from "../Componants/management/ReservationManagement";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
export const Test = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: getAllReservation,
  });

  const showData = () => {
    console.log(data);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "#3f50b5" }} />
    </Container>
  );
};
