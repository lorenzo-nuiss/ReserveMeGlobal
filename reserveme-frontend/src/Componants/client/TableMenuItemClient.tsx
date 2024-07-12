import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenuItemList } from "../management/MenuReservationManagement";
import { MenuItemRepo } from "../../Type/MenuData";

interface MenuProps {
  menuId: number;
}

export const TableMenuItemClient = ({ menuId }: MenuProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoMenuItem"],
    queryFn: () => getMenuItemList(menuId),
  });

  if (isPending)
    return (
      <Box
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#3f50b5" }} />
      </Box>
    );
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.map((row: MenuItemRepo) => {
        const { name, description, price } = row;
        return (
          <Grid key={name} item xs={12} sm={6}>
            <Card
              sx={{
                width: { xs: "auto", sm: "100%" },
                margin: 2,
              }}
            >
              {" "}
              <CardContent>
                <Stack justifyContent={"space-between"} direction={"row"}>
                  <div>
                    <Typography variant="h6" component="div">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </div>
                  <Typography textAlign={"right"} variant="body2">
                    {price} €
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};
