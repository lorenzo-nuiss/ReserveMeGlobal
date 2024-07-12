import { useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
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
  Alert,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";

// components
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
  getAllReservation,
} from "../Componants/management/ReservationManagement";
import dayjs from "dayjs";
import AlertMessage from "../Componants/AlertMessage";

// dayjs config

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

export default function ReservationPage() {
  const [selectedReservationClick, setSelectedReservationClick] =
    useState<ReservationsRepo | null>(null);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState("date");
  const [filterName, setFilterName] = useState("");
  const [textAlert, setTextAlert] = useState("Bien enregistré");
  const [severityText, setSeverityText] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertVisibleCustom, setIsAlertVisibleCustom] = useState(false);

  const queryClient = useQueryClient();
  // query request
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: getAllReservation,
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

  const filteredReservations = data
    ? data.filter((reservation: { firstname: string | null }) =>
        (reservation.firstname || "")
          .toLowerCase()
          .includes(filterName.toLowerCase())
      )
    : [];

  const showAlert = () => {
    setIsAlertVisible(true);
  };

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
        await mutation.mutateAsync(selectedReservationClick.id);
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la réservation :",
          error
        );
      }
    }
  };

  const isNotFound = !filteredReservations.length && !!filterName;

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
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          {isAlertVisibleCustom && (
            <AlertMessage
              text={textAlert}
              severity={severityText}
              autoClose
              duration={3000}
              onClose={() => setIsAlertVisibleCustom(false)}
            />
          )}
          <Typography variant="h4" gutterBottom>
            Réservations
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={handleOpenCreateModal}
            color="primary2"
            sx={{ mt: 1, px: 4, py: 1.8 }}
          >
            Ajouter réservation
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            listIdSelected={selectedId}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Box>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredReservations.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredReservations
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
                                {firstname}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{guests}</TableCell>

                          <TableCell align="left">{status}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>

                          <TableCell align="left">{email}</TableCell>
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
          </Box>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            labelRowsPerPage="Lignes par page" // Changez le texte ici
            count={filteredReservations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
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
        showAlert={() => showAlertCustom("Réservation bien modifié", "success")}
      />
    </>
  );
}
