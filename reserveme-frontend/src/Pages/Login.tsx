import React from "react";

import { Navigate } from "react-router-dom";

import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthService from "../Componants/management/AuthService";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";

interface FormValues {
  email: string;
  password: string;
}

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

const StyledBtn = styled(Button)`
  width: 100%;
  height: 56px;
  box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.05);
`;

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;

  if (isSubmitting) {
    // Rediriger une fois la soumission réussie
    return <Navigate to="/dashboard/app" />;
  }

  return (
    <LoginContainer>
      <FormContainer>
        <StyledAvatar>
          <LockOutlinedIcon color="primary" />
        </StyledAvatar>
        <StyledTypography variant="h5" mb={4}>
          Connexion
        </StyledTypography>

        <Form className="form_controler_sign">
          <Field
            sx={{ width: "100%" }}
            label="Email"
            type="text"
            name="email"
            placeholder="Email"
            as={TextField}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          <Field
            sx={{ width: "100%" }}
            type="password"
            name="password"
            label="Mot de passe"
            placeholder="Password"
            as={TextField}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />

          <StyledBtn
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress /> : "Se connecter"}
            {/* S'inscrire */}
          </StyledBtn>
        </Form>
      </FormContainer>
    </LoginContainer>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

const Login = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    const { email, password } = values;
    AuthService.login(email, password).then(
      (response) => {
        console.log(response);
        setSubmitting(true);
        console.log(AuthService.getCurrentUser());
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(resMessage);
        setSubmitting(false);
      }
    );
    console.log(AuthService.getCurrentUser());

    setSubmitting(false);
  },
})(InnerForm);

export default Login;
