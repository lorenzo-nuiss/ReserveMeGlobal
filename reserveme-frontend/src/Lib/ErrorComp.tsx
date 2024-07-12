import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import ReservationPage from "../Pages/ReservationPage";

export const ErrorComp = () => {
  return (
    <ErrorBoundary>
      <ReservationPage />
    </ErrorBoundary>
  );
};
