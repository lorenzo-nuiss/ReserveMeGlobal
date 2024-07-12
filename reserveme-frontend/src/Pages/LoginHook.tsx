import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Navigate } from "react-router-dom";

import * as Yup from "yup";
import {
  TextField,
  CircularProgress,
  Button,
  Avatar,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../Componants/management/AuthService";
import { styled } from "@mui/material/styles";

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

const FormContainer = styled(Container)`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Adresse mail incorrecte").required("Requis"),
  password: Yup.string().required("Requis"),
});

const initialValues: FormValues = {
  email: "",
  password: "",
};

function LoginHook() {
  //   const mutation = useMutation({ mutationFn: AuthService.login });

  const [isSubmitting, setSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: (variables: { email: string; password: string }) =>
      AuthService.login(variables.email, variables.password),
    onSuccess: () => {
      // Appeler la fonction de mise à jour de la liste des réservations
      // Fermez le modal (si nécessaire)

      setSubmitting(true);
      console.log("Logged in successfully");
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values;

    try {
      await mutation.mutateAsync({ email, password });
    } catch (error) {
      console.error("Erreur lors de la mutation : ", error);
    }
  };

  // const handleSubmit = (values: FormValues) => {
  // }

  if (isSubmitting) {
    // Rediriger une fois la soumission réussie
    return <Navigate to="/dashboard/app" />;
  }

  return (
    <LoginContainer>
      <FormContainer maxWidth={"xs"}>
        <Avatar sx={{ margin: "0 auto", backgroundColor: "#1E000E" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" textAlign={"center"} mb={4}>
          Connexion
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{
                  textTransform: "none",
                  width: "100%",
                  height: "56px",
                  boxShadow: "0px 0px 20px 0 rgba(0, 0, 0, 0.05)",
                  fontSize: "17px",
                }}
              >
                {isSubmitting ? <CircularProgress /> : "Se connecter"}
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </LoginContainer>
  );
}

export default LoginHook;
