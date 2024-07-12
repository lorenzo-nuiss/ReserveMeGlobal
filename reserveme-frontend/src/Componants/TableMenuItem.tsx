import { useState } from "react";

import {
  Table,
  Stack,
  Button,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  Box,
  Container,
  TableContainer,
  TablePagination,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import UserListHeadSimplify from "../Layout/table/UserListHeadSimplify";
import { MenuItemRepo } from "../Type/MenuData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMenuItemList } from "./management/MenuReservationManagement";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { EditMenuItemModal } from "./admin/EditMenuItemModal";
import AlertMessage from "./AlertMessage";
import { deleteMenuItem } from "./management/MenuItemManagement";
import { AddEditMenuItemModal } from "./admin/AddMenuItemModal";

const TABLE_HEAD = [
  { id: "name", label: "Nom" },
  { id: "description", label: "Description" },
  { id: "price", label: "Prix" },
];

interface MenuProps {
  menuId: number;
}

export const TableMenuItem = ({ menuId }: MenuProps) => {
  const [menuItemSelected, setMenuItemSelected] = useState<MenuItemRepo | null>(
    null
  );

  const [textAlert, setTextAlert] = useState("Bien enregistré");
  const [severityText, setSeverityText] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [isAlertVisibleCustom, setIsAlertVisibleCustom] = useState(false);
  const [isModalEditMenuItemOpen, setIsModalEditMenuItemOpen] = useState(false);
  const [isModalCreateMenuItemOpen, setIsModalCreateMenuItemOpen] =
    useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["repoMenuItem"],
    queryFn: () => getMenuItemList(menuId),
  });

  const updateMenuItemList = () => {
    queryClient.invalidateQueries({ queryKey: ["repoMenuItem"] });
  };

  const handleOpenCreateModal = () => {
    setIsModalCreateMenuItemOpen(true);
  };

  const mutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      updateMenuItemList();
      // Fermez le modal (si nécessaire)
      showAlertCustom("Suppression effectuée", "error");
    },
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const MenuItemList = data ? data : [];

  const handleEditItem = (menuItem: MenuItemRepo) => {
    setMenuItemSelected(menuItem);
    setIsModalEditMenuItemOpen(true);
  };

  const handleChangePage = (
    event: React.MouseEvent<unknown> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const showAlertCustom = (
    texte: string,
    texteSeverity: "error" | "info" | "success" | "warning"
  ) => {
    setTextAlert(texte);
    setSeverityText(texteSeverity);
    setIsAlertVisibleCustom(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await mutation.mutateAsync(id);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation :", error);
    }
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
      {menuItemSelected && (
        <EditMenuItemModal
          isOpen={isModalEditMenuItemOpen}
          updateMenuItemList={updateMenuItemList}
          showAlert={showAlertCustom}
          menuItemSelected={menuItemSelected}
          onClose={() => setIsModalEditMenuItemOpen(false)}
        />
      )}
      <Box>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHeadSimplify headLabel={TABLE_HEAD} />
            <TableBody>
              {MenuItemList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row: MenuItemRepo) => {
                const { id, name, description, price } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1} role="checkbox">
                    <TableCell component="th" scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{description}</TableCell>

                    <TableCell align="left">{price}</TableCell>

                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ mx: 2 }}
                        onClick={() => handleEditItem(row)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="text"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteForeverRoundedIcon
                          color="error"
                          sx={{ mx: 2 }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{ mt: 5 }}
          color="primary2"
          onClick={handleOpenCreateModal}
        >
          Ajouter
        </Button>
      </Box>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        labelRowsPerPage="Lignes par page" // Changez le texte ici
        count={MenuItemList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AddEditMenuItemModal
        menuId={menuId}
        isOpen={isModalCreateMenuItemOpen}
        updateMenuItemList={updateMenuItemList}
        showAlert={showAlertCustom}
        onClose={() => setIsModalCreateMenuItemOpen(false)}
      />
      {isAlertVisibleCustom && (
        <AlertMessage
          text={textAlert}
          severity={severityText}
          autoClose
          duration={3000}
          onClose={() => setIsAlertVisibleCustom(false)}
        />
      )}
    </>
  );
};
