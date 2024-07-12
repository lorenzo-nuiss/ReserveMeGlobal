import React, { useState, ChangeEvent, FormEvent } from "react";
import AuthService from "../Componants/management/AuthService";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === "name") {
  //     setName(value);
  //   } else if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

        // setMessage(resMessage);
        // setSuccessful(false);
      }
    );
  };

  // ---------- style
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

  const StyledTextField = styled(TextField)`
    width: 100%;
  `;

  const StyledButton = styled(Button)`
    width: 100%;
    height: 56px;
    box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.05);
  `;
  return (
    <LoginContainer>
      <FormContainer>
        <StyledAvatar>
          <LockOutlinedIcon color="primary" />
        </StyledAvatar>
        <StyledTypography variant="h5" mb={4}>
          Inscription
        </StyledTypography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            variant="outlined"
            label="Numéro de téléphone"
            autoComplete="false"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <StyledTextField
            variant="outlined"
            label="Email"
            color="primary"
            autoComplete="false"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            variant="outlined"
            label="Mot de passe"
            type="password"
            autoComplete="false"
            name="password"
            required
            color="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton variant="contained" color="primary" type="submit">
            S'inscrire
          </StyledButton>
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
export default Register;
