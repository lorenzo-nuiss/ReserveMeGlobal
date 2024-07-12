import PropTypes from "prop-types";
// @mui
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead(props: {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: "asc" | "desc";
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (property: string) => void;
  headLabel: {
    id: string;
    label: string;
  }[];
}) {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      // Correction ici
      onRequestSort(property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
        </TableCell>
        {props.headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={props.orderBy === headCell.id ? props.order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={props.orderBy === headCell.id}
              direction={props.orderBy === headCell.id ? props.order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {props.orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {props.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function onRequestSort(property: string) {
  throw new Error("Function not implemented.");
}
