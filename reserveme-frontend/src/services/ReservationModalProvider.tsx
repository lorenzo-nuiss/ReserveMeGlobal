import React, { createContext, useContext, useState } from "react";

interface ReservationModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ReservationModalContext = createContext<
  ReservationModalContextType | undefined
>(undefined);

export function ReservationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ReservationModalContext.Provider
      value={{ isModalOpen, openModal, closeModal }}
    >
      {children}
    </ReservationModalContext.Provider>
  );
}

export function useReservationModal() {
  const context = useContext(ReservationModalContext);
  if (context === undefined) {
    throw new Error(
      "useReservationModal must be used within a ReservationModalProvider"
    );
  }
  return context;
}
