import * as Yup from "yup";
import * as React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Grid, Paper, Typography} from "@mui/material";
import BaseRegisterForm, {baseFormValidationSchema} from "./BaseRegisterForm";
import UserDetailsRegisterForm, {userDetailsValidationSchema} from "./UserDetailsRegisterForm";
import {useState} from "react";
import AddressRegisterForm from "./AddressRegisterForm";
import appClient from "../../client/appClient";
import AuthButton from "../../components/AuthButton";

const validationSchema = Yup.object().shape({
  ...baseFormValidationSchema,
  ...userDetailsValidationSchema
})

const RegisterPage = (props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [errorsMessages, setErrorsMessages] = useState([])

  const handleRegister = async (data) => {
    try {
      const {
        company,
        name,
        username,
        password,
        confirmPassword,
        email,
        phone,
        street,
        city,
        suite,
      } = data

      const registerData = {
        companyId: company.id.toString(),
        name,
        username,
        password,
        confirmPassword,
        email,
        phone: phone.toString(),
        address: {
          street: street,
          city: city,
          suite: suite
        }
      }

      await appClient.auth.register(registerData);

      props.history.push("/login");
    } catch (err) {
      console.error(err.response.data.errors);
      setErrorsMessages(err.response.data.errors);
    }
  }

  return (
    <React.Fragment>
      <Paper>
        <Box px={3} py={2} mt={3}>
          <Typography variant="h6" align="center" margin="dense">
            Register
          </Typography>
          <BaseRegisterForm
            useFormProps={{
              register,
              control,
              errors
            }}
          />
          <UserDetailsRegisterForm
            useFormProps={{
              register,
              control,
              errors,
              setValue
            }}
          />
          <AddressRegisterForm
            useFormProps={{
              register,
              control,
              errors,
            }}
          />
          <Grid mt={3} container={true} justifyContent="center">
            <AuthButton
              label="Register"
              errors={errorsMessages}
              clickHandler={handleSubmit(handleRegister)}
            />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default RegisterPage;