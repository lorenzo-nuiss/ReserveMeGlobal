import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

interface AlertMessageProps {
  text: string;
  severity: "error" | "warning" | "info" | "success";
  autoClose: boolean;
  duration: number;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  text,
  severity,
  autoClose,
  duration,
  onClose,
}) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        onClose(); // Appel de la fonction de rappel lorsque l'alerte se ferme automatiquement
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [autoClose, duration, onClose]);

  return (
    <Box sx={{ position: "fixed", bottom: "70px", right: "80px" }}>
      {showAlert && (
        <Alert
          color={severity}
          severity={severity}
          onClose={() => setShowAlert(false)}
        >
          {text}
        </Alert>
      )}
    </Box>
  );
};

export default AlertMessage;
