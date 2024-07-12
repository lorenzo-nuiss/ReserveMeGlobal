import React from "react";
import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";

// component
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  acceptReservation,
  deleteReservation,
} from "../../Componants/management/ReservationManagement";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------
interface UserListToolbarProps {
  numSelected: number;
  filterName: string;
  listIdSelected: number[];
  updateReservationList: () => void;
  showAlert: (
    texte: string,
    texteSeverity: "success" | "error" | "info" | "warning"
  ) => void;

  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void; // Modifier la signature de cette fonction
}

UserListToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
};

export default function UserListToolbar({
  numSelected,
  filterName,
  updateReservationList,
  showAlert,
  onFilterName,
  listIdSelected,
}: UserListToolbarProps) {
  const handleDelete = () => {
    if (listIdSelected.length > 0) {
      try {
        for (const reservationId of listIdSelected) {
          mutationDelete.mutate(reservationId);
          console.log(
            `Suppression réussie de la réservation avec l'ID : ${reservationId}`
          );
        }
        showAlert("Suppressions réussie", "success");
      } catch (error) {
        showAlert("Suppressions impossible", "error");
        console.error(
          "Erreur lors de la suppression des réservations : ",
          error
        );
      }
    }
  };
  const handleValidate = () => {
    if (listIdSelected.length > 0) {
      try {
        for (const reservationId of listIdSelected) {
          mutationAccepted.mutate(reservationId);
          console.log(` réservation accepté`);
        }
        showAlert("Réservations accéptées", "success");
      } catch (error) {
        showAlert("Erreur", "error");
        console.error(
          "Erreur lors de la modification des réservations : ",
          error
        );
      }
    }
  };

  const mutationDelete = useMutation({
    mutationFn: deleteReservation,
    onSuccess: updateReservationList,
  });
  const mutationAccepted = useMutation({
    mutationFn: acceptReservation,
    onSuccess: () => {
      updateReservationList();
    },
  });

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} sélectionnées
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Recherchez..."
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <div>
          <Tooltip title="Valider">
            <IconButton onClick={handleValidate}>
              <AssignmentTurnedInRoundedIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton onClick={handleDelete}>
              <DeleteForeverRoundedIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      ) : null}
    </StyledRoot>
  );
}
