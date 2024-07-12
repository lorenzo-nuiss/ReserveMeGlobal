import { TableCell, TableRow, TableHead } from "@mui/material";

export default function UserListHeadSimplify(props: {
  headLabel: {
    id: string;
    label: string;
  }[];
}) {
  return (
    <TableHead>
      <TableRow>
        {props.headLabel.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
