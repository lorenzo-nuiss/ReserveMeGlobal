import { TableMenuItem } from "../Componants/TableMenuItem";

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { CustomTabPanel } from "../Componants/CustomTabPanel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMenuList } from "../Componants/management/MenuReservationManagement";
import { MenuRepo } from "../Type/MenuData";
import Button from "@mui/material/Button";
import { AddMenuModal } from "../Componants/admin/AddMenuModal";
import Stack from "@mui/material/Stack";
import AlertMessage from "../Componants/AlertMessage";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { EditMenuModal } from "../Componants/admin/EditMenuModal";

export const Menu = () => {
  const [textAlert, setTextAlert] = useState("Bien enregistré");
  const [menuSelected, setMenuSelected] = useState<MenuRepo | null>(null);

  const [severityText, setSeverityText] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [isModalCreateMenuOpen, setIsModalCreateMenuOpen] = useState(false);
  const [isModalEditMenuOpen, setIsModalEditMenuOpen] = useState(false);
  const [isAlertVisibleCustom, setIsAlertVisibleCustom] = useState(false);

  const [value, setValue] = useState(0);
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery<MenuRepo[]>({
    queryKey: ["repoMenu"],
    queryFn: getMenuList,
  });

  const updateMenuList = () => {
    queryClient.invalidateQueries({ queryKey: ["repoMenu"] });
  };

  const handleOpenCreateModal = () => {
    setIsModalCreateMenuOpen(true);
  };
  const handleIconClick = (menu: MenuRepo) => {
    setMenuSelected(menu);
    setIsModalEditMenuOpen(true);
  };

  const showAlertCustom = (
    texte: string,
    texteSeverity: "error" | "info" | "success" | "warning"
  ) => {
    setTextAlert(texte);
    setSeverityText(texteSeverity);
    setIsAlertVisibleCustom(true);
  };

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
    <>
      <div>
        <Stack>
          <h1>Catégorie</h1>
          {isAlertVisibleCustom && (
            <AlertMessage
              text={textAlert}
              severity={severityText}
              autoClose
              duration={3000}
              onClose={() => setIsAlertVisibleCustom(false)}
            />
          )}
        </Stack>
        <Button
          variant="contained"
          onClick={handleOpenCreateModal}
          color="primary2"
          sx={{ float: "right", mt: 1, px: 4, py: 1.5 }}
        >
          Ajouter une catégorie
        </Button>
        <AddMenuModal
          isOpen={isModalCreateMenuOpen}
          updateMenuList={updateMenuList}
          showAlert={showAlertCustom}
          onClose={() => setIsModalCreateMenuOpen(false)}
        />
        {menuSelected && (
          <EditMenuModal
            isOpen={isModalEditMenuOpen}
            updateMenuList={updateMenuList}
            showAlert={showAlertCustom}
            menuSelected={menuSelected}
            onClose={() => setIsModalEditMenuOpen(false)}
          />
        )}
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {data?.map((menu, index) => (
            <Tab
              label={menu.name}
              key={menu.id}
              icon={
                <EditRoundedIcon
                  color="secondary"
                  onClick={() => handleIconClick(menu)}
                  fontSize="small"
                />
              }
            />
          ))}
        </Tabs>
        {data?.map((menu, index) => (
          <CustomTabPanel value={value} index={index} key={menu.id}>
            <TableMenuItem menuId={menu.id} />
          </CustomTabPanel>
        ))}
      </div>
    </>
  );
};
