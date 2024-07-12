// import React from "react";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";

// const StyledLabel = styled("span")(({ theme, color }) => ({
//   display: "inline-block",
//   padding: theme.spacing(0.5, 1),
//   borderRadius: theme.shape.borderRadius,
//   // backgroundColor: theme.palette[color].main,
//   // color: theme.palette[color].contrastText,
//   fontWeight: "bold",
//   textTransform: "uppercase",
// }));

// interface LabelProps {
//   color: "primary" | "secondary" | "error" | "success" | "info" | "warning";
//   children: React.ReactNode;
// }

// const Label: React.FC<LabelProps> = ({ color, children }) => {
//   return <StyledLabel color={color}>{children}</StyledLabel>;
// };

// Label.propTypes = {
//   color: PropTypes.oneOf([
//     "primary",
//     "secondary",
//     "error",
//     "success",
//     "info",
//     "warning",
//   ]).isRequired,
//   children: PropTypes.node.isRequired,
// };

// export default Label;
