import React, { Component } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/material/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserLogin, UserRegister } from "../Type/AdminData";
import AuthService from "../Componants/management/AuthService";

type Props = {};

type State = {
  phoneNumber: string;
  email: string;
  password: string;
  successful: boolean;
  loading: boolean;
  message: string;
  focusedPhoneNumber: boolean;
  focusedEmail: boolean;
  focusedPassword: boolean;
  errors: { phoneNumber: string; email: string; password: string };
};

export default class RegisterPoo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      phoneNumber: "",
      email: "",
      password: "",
      successful: false,
      loading: false,
      message: "",
      focusedPhoneNumber: false,
      focusedEmail: false,
      focusedPassword: false,
      errors: { phoneNumber: "", email: "", password: "" },
    };
  }

  validationSchema() {
    return Yup.object().shape({
      phoneNumber: Yup.string()
        .matches(
          /^(\+\d{1,3}[- ]?)?\d{10}$/,
          "Invalid phone number. Use format: +123-4567890"
        )
        .required("Phone number is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val && val.toString().length >= 6 && val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: UserRegister) {
    const { phoneNumber, email, password } = formValue;

    this.setState({
      message: "",
      successful: false,
      errors: { phoneNumber: "", email: "", password: "" },
    });

    const validationErrors = this.validateForm(formValue);

    if (Object.keys(validationErrors).length === 0) {
      AuthService.register(phoneNumber, email, password).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    } else {
      alert("erreur");
      // Il y a des erreurs de validation, mettez à jour l'état des erreurs
      this.setState({
        errors: validationErrors,
      });
    }
  }

  validateForm(formValue: UserRegister) {
    const errors: { phoneNumber: string; email: string; password: string } = {
      phoneNumber: "",
      email: "",
      password: "",
    };
    const { phoneNumber, email, password } = formValue;

    // Effectuez la validation ici
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Invalid phone number. Use format: +336-4567890";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "This is not a valid email.";
    }

    if (password.length < 6 || password.length > 40) {
      errors.password = "The password must be between 6 and 40 characters.";
    }

    return errors;
  }

  render() {
    const { successful, message, errors } = this.state;

    const initialValues = {
      phoneNumber: "",
      email: "",
      password: "",
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      fieldName: string
    ) => {
      const value = e.target.value;

      // Validez la valeur en fonction du champ (fieldName) et mettez à jour les erreurs
      let errorMessage = "";

      if (fieldName === "phoneNumber") {
        // Effectuez la validation pour le numéro de téléphone
        if (!/^\+\d{1,3}[- ]?\d{10}$/.test(value)) {
          errorMessage = "Invalid phone number. Use format: +123-4567890";
        }
      } else if (fieldName === "email") {
        // Effectuez la validation pour l'e-mail
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          errorMessage = "This is not a valid email.";
        }
      } else if (fieldName === "password") {
        // Effectuez la validation pour le mot de passe
        if (value.length < 6 || value.length > 40) {
          errorMessage = "The password must be between 6 and 40 characters.";
        }
      }

      this.setState((prevState) => ({
        ...prevState,
        [fieldName]: value,
        errors: {
          ...prevState.errors,
          [fieldName]: errorMessage,
        },
      }));
    };

    // const handleBlur=(fieldName:UserRegister) => {
    //   this.setState({
    //     touched: { ...this.state.touched, [fieldName]: true },
    //   });
    // }

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
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            {!successful && (
              <StyledForm>
                <StyledTextField
                  variant="outlined"
                  label="Numéro de téléphone"
                  required
                  name="phoneNumber"
                  type="text"
                  // error={!!errors.phoneNumber}
                  // helperText={errors.phoneNumber}
                  as={TextField}
                  onChange={(e) => handleChange(e, "phoneNumber")}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="alert alert-danger"
                />
                {errors.phoneNumber}

                <StyledTextField
                  variant="outlined"
                  label="Email"
                  required
                  name="email"
                  type="email"
                  as={TextField}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
                {errors.email}

                <StyledTextField
                  variant="outlined"
                  label="Mot de passe"
                  required
                  as={TextField}
                  name="password"
                  type="password"
                />
                <StyledButton variant="contained" color="primary" type="submit">
                  S'inscrire
                </StyledButton>

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </StyledForm>
            )}
          </Formik>
        </FormContainer>
      </LoginContainer>
    );
  }
}
