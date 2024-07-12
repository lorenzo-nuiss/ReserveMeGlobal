import React, { useState } from "react";
import { Container } from "@mui/system";
import { Tabs, Tab, Box, Typography } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import { TabPanelMenuItem } from "../Componants/client/TabPanelMenuItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MenuRepo } from "../Type/MenuData";
import { getMenuList } from "../Componants/management/MenuReservationManagement";
import { TableMenuItemClient } from "../Componants/client/TableMenuItemClient";
import { styled } from "@mui/material/styles";

const LargeDiv = styled("div")`
  width: 100%;
  background-color: #332f1d;
  min-height: 100vh;
`;
const CustomContainer = styled(Container)(({ theme }) => ({}));

export const MenuClient = () => {
  const [value, setValue] = useState(0);

  const { isPending, error, data } = useQuery<MenuRepo[]>({
    queryKey: ["repoMenu"],
    queryFn: getMenuList,
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (isPending)
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
  if (error) return "An error has occurred: " + error.message;

  return (
    <LargeDiv>
      <CustomContainer sx={{ pt: 17 }}>
        <Box>
          <Typography align="center" variant="h6" className="txtLight">
            Notre carte
          </Typography>
          <Typography
            align="center"
            variant="h3"
            gutterBottom
            sx={{ pb: 4, fontWeight: 500, color: "#fff" }}
          >
            Consultez notre carte
          </Typography>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {data?.map((menu, index) => (
            <Tab label={menu.name} key={menu.id} />
          ))}
        </Tabs>
        {data?.map((menu, index) => (
          <TabPanelMenuItem value={value} index={index} key={menu.id}>
            <TableMenuItemClient menuId={menu.id} />
          </TabPanelMenuItem>
        ))}
      </CustomContainer>
    </LargeDiv>
  );
};
