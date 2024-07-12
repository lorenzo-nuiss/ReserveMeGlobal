import React, { useState, ChangeEvent, FormEvent } from "react";

import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthService from "../Componants/management/AuthService";

const LoginContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-image: url("../public/img-login3.jpg");
`;

const FormContainer = styled("div")`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 460px;
`;

const StyledAvatar = styled(Avatar)`
  margin: 0 auto;
  background-color: black;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledBtn = styled(Button)`
  width: 100%;
  height: 56px;
  box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.05);
`;

export const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Réinitialisez les messages d'erreur
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (phoneNumber === "") {
      setNameError("Ce champ est requis");
      isValid = false;
    }

    if (email === "") {
      setEmailError("Ce champ est requis");
      isValid = false;
    }

    if (password === "") {
      setPasswordError("Ce champ est requis");
      isValid = false;
    }

    if (isValid) {
      AuthService.register(phoneNumber, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
      // Après une inscription réussie :
      setMessage("Inscription réussie !");
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <StyledAvatar>
          <LockOutlinedIcon color="primary" />
        </StyledAvatar>
        <StyledTypography variant="h5" mb={4}>
          Signin
        </StyledTypography>

        <StyledForm onSubmit={handleRegister}>
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            label="Numéro de téléphone"
            name="phoneNumber"
            color="secondary"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={nameError !== ""}
            helperText={nameError}
          />
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            label="Email"
            color="secondary"
            name="email"
            value={email}
            error={emailError !== ""}
            helperText={emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            label="Mot de passe"
            color="secondary"
            name="password"
            type="password"
            value={password}
            error={passwordError !== ""}
            helperText={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />

          <StyledBtn
            variant="contained"
            color="primary"
            type="submit"
            disabled={successful ? true : false}
          >
            S'inscrire
          </StyledBtn>
        </StyledForm>
        {message && (
          <Typography color={successful ? "primary" : "error"} align="center">
            {message}
          </Typography>
        )}
      </FormContainer>
    </LoginContainer>
  );
};
