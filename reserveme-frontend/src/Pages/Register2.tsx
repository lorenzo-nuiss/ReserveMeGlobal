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
  phoneNumber: string;
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

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledBtn = styled(Button)`
  width: 100%;
  height: 56px;
  box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.05);
  text-transform: none;
  font-size: 16px;
`;

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;

  if (isSubmitting) {
    // Rediriger une fois la soumission réussie
    // upgrade code, faire une page de confirmation
    return <Navigate to="/connexion" />;
  }
  return (
    <LoginContainer>
      <FormContainer>
        <StyledAvatar>
          <LockOutlinedIcon color="primary" />
        </StyledAvatar>
        <StyledTypography variant="h5" mb={4}>
          Inscription
        </StyledTypography>

        <Form className="form_controler_sign">
          <Field
            sx={{ width: "100%" }}
            label="Numéro de téléphone"
            type="text"
            name="phoneNumber"
            placeholder="Numéro de téléphone"
            as={TextField}
            error={touched.phoneNumber && !!errors.phoneNumber}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
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
            {isSubmitting ? <CircularProgress /> : "S'inscrire"}
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

const Register2 = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: () => {
    return {
      phoneNumber: "",
      email: "",
      password: "",
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone number must contain only digits";
    }
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
    const { phoneNumber, email, password } = values;
    AuthService.register(phoneNumber, email, password).then(
      (response) => {
        console.log("response good :");
        setSubmitting(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log("resMessage bad");
        console.log(resMessage);
        setSubmitting(false);
      }
    );
    setSubmitting(false);
  },
})(InnerForm);

export default Register2;
