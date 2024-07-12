import { useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  Box,
  MenuItem,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import UserListToolbar from "../Layout/table/UserListToolbar";
import UserListHead from "../Layout/table/UserListHead";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { ReservationsRepo } from "../Type/UserData";
import EditModalDial from "../Layout/table/EditModalDial";
import ReservationModal from "../Layout/table/createModal/ReservationModal";
import {
  deleteReservation,
  getAllReservationWaiting,
} from "../Componants/management/ReservationManagement";
import AlertMessage from "../Componants/AlertMessage";

const AdminPageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  margin: 0,
}));

const AdminCard = styled(Card)(({ theme }) => ({
  width: "400px",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  boxShadow: "0px 0px 26px 0px rgba(0, 0, 0, 0.2)",
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const ReservationInfo = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ActionButtons = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  "& button": {
    marginRight: theme.spacing(2),
  },
}));

const CardReservation = styled("div")(({ theme }) => ({
  backgroundColor: "#FFF1DB",
  padding: theme.spacing(3),
  borderRadius: "8px",
}));

// ----------------------------------------

const TABLE_HEAD = [
  { id: "date", label: "date" },
  { id: "name", label: "Nom" },
  { id: "guests", label: "Personnes" },
  { id: "status", label: "Status" },
  { id: "phoneNumber", label: "Numéro de téléphone" },
  { id: "email", label: "Email" },
  { id: "notes", label: "Notes" },
  { id: "", label: "" },
];

const AdminHome2 = () => {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState("date");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [textAlert, setTextAlert] = useState("Bien enregistré");

  const [severityText, setSeverityText] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isAlertVisibleCustom, setIsAlertVisibleCustom] = useState(false);

  const [selectedReservationClick, setSelectedReservationClick] =
    useState<ReservationsRepo | null>(null);

  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: getAllReservationWaiting,
  });

  const mutation = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      updateReservationList();
      // Fermez le modal (si nécessaire)
      showAlertCustom("Réservation supprimée", "warning");
      handleCloseMenu();
    },
  });
  const updateReservationList = () => {
    queryClient.invalidateQueries({ queryKey: ["repoData"] });
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    reservationSelected: ReservationsRepo
  ) => {
    setOpen(event.currentTarget);
    setSelectedReservationClick(reservationSelected);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenModal = () => {
    // fermer l'autre pupup
    handleCloseMenu();
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map(
        (reservation: { firstname: string }) => reservation.firstname
      );
      const newSelectedsIds = data.map(
        (reservation: { id: bigint }) => reservation.id
      );
      setSelected(newSelecteds);
      setSelectedId(newSelectedsIds);
      return;
    }
    setSelected([]);
    setSelectedId([]);
  };
  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
    id: number
  ) => {
    // Reste du code inchangé
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    let newSelectedIds: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedIds = newSelectedIds.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedIds = newSelectedIds.concat(selectedId.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedIds = newSelectedIds.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedIds = newSelectedIds.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setSelectedId(newSelectedIds);
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

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = data
    ? data.filter((reservation: { firstname: string | null }) =>
        (reservation.firstname || "")
          .toLowerCase()
          .includes(filterName.toLowerCase())
      )
    : [];

  const isNotFound = !filteredUsers.length && !!filterName;

  const showAlertCustom = (
    texte: string,
    texteSeverity: "error" | "info" | "success" | "warning"
  ) => {
    setTextAlert(texte);
    setSeverityText(texteSeverity);
    setIsAlertVisibleCustom(true);
  };

  const handleDelete = async () => {
    if (selectedReservationClick != null) {
      try {
        // Vous pouvez appeler cette fonction lorsqu'un utilisateur souhaite supprimer une réservation.
        await mutation.mutateAsync(selectedReservationClick.id);
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la réservation :",
          error
        );
      }
    }
  };
  // Exemple de données pour les notifications
  const notifications = [
    {
      id: 1,
      message: "Nouvelle réservation reçue.",
    },
    {
      id: 2,
      message: "Confirmation d'une réservation.",
    },
    // Ajoutez d'autres notifications ici...
  ];

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

  if (data === null) return " pas de donnée " + console.log(data);

  return (
    <AdminPageContainer>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Tableau de bord administrateur
      </Typography>
      <CardReservation>
        <UserListToolbar
          updateReservationList={updateReservationList}
          showAlert={showAlertCustom}
          numSelected={selected.length}
          listIdSelected={selectedId}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Box>
          {isAlertVisibleCustom && (
            <AlertMessage
              text={textAlert}
              severity={severityText}
              autoClose
              duration={3000}
              onClose={() => setIsAlertVisibleCustom(false)}
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Réservation en attente :</Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineRoundedIcon />}
              onClick={handleOpenCreateModal}
              color="primary2"
              sx={{ mt: 1, px: 4, py: 1.8 }}
            >
              Ajouter réservation
            </Button>
          </Box>

          {Array.isArray(data) && data.length === 0 ? (
            <div>Aucune réservation en attenre.</div>
          ) : (
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: ReservationsRepo) => {
                      const {
                        id,
                        date,
                        firstname,
                        civilite,
                        guests,
                        notes,
                        phoneNumber,
                        status,
                        email,
                      } = row;
                      const selectedReservation =
                        selected.indexOf(firstname) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedReservation}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedReservation}
                              onChange={(event) =>
                                handleClick(event, firstname, id)
                              }
                            />
                          </TableCell>

                          <TableCell align="left">
                            {dayjs(date).format("DD/MM HH:mm")}
                          </TableCell>
                          <TableCell component="th" scope="row" align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {civilite === "MONSIEUR"
                                  ? "Mr."
                                  : civilite === "MADAME"
                                  ? "Mme"
                                  : civilite}{" "}
                                {firstname}{" "}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{guests}</TableCell>

                          <TableCell align="left">{status}</TableCell>

                          <TableCell align="left">{phoneNumber}</TableCell>

                          <TableCell align="left">
                            {/* <Label color={(status === 'banned' && 'error') || 'success'}>
                            {status}
                          </Label> */}
                            {email}
                          </TableCell>

                          <TableCell align="left">{notes}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => handleOpenMenu(event, row)}
                            >
                              <MoreVertRoundedIcon />
                            </IconButton>
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

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          )}
        </Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Lignes par page" // Changez le texte ici
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* <AdminCard>
        <CardTitle>Notifications</CardTitle>
        {notifications.map((notification, index) => (
          <div key={index}>
            <Typography variant="body1">{notification.message}</Typography>
          </div>
        ))}
      </AdminCard> */}
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              "& .MuiMenuItem-root": {
                px: 1,
                typography: "body2",
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem onClick={handleOpenModal}>
            <EditRoundedIcon sx={{ mr: 2 }} />
            Modifier
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <DeleteForeverRoundedIcon sx={{ mr: 2 }} />
            Supprimer
          </MenuItem>
        </Popover>

        {selectedReservationClick && (
          <EditModalDial
            reservation={selectedReservationClick}
            isOpen={isModalOpen}
            updateReservationList={updateReservationList}
            onClose={() => setIsModalOpen(false)}
            showAlert={() =>
              showAlertCustom("Réservation bien modifié", "success")
            }
          />
        )}
        <ReservationModal
          isOpen={isModalCreateOpen}
          updateReservationList={updateReservationList}
          onClose={() => setIsModalCreateOpen(false)}
          showAlert={() =>
            showAlertCustom("Réservation bien modifié", "success")
          }
        />
      </CardReservation>
    </AdminPageContainer>
  );
};

export default AdminHome2;
