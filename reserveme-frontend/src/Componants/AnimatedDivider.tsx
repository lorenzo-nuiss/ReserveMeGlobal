import React from "react";
import { styled, keyframes } from "@mui/system";

const wave = keyframes`
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.8);
  }
  100% {
    transform: scaleY(1);
  }
`;

const DividerContainer = styled("div")`
  width: 100%;
  height: 2px;
  background-color: #202020;
  position: relative;
  overflow: hidden;
  margin: 16px 0;
`;

const DividerLine = styled("div")`
  width: 100%;
  height: 100%;
  background-color: #ff9900; /* Couleur du diviseur */
  position: absolute;
  bottom: 0;
  animation: ${wave} 2s linear infinite;
  transform-origin: top;
`;

const AnimatedDivider = () => {
  return (
    <DividerContainer>
      <DividerLine />
    </DividerContainer>
  );
};

export default AnimatedDivider;
