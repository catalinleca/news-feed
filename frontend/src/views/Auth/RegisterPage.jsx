import * as Yup from "yup";
import * as React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import BaseRegisterForm, {baseFormValidationSchema} from "./BaseRegisterForm";
import UserDetailsRegisterForm, {userDetailsValidationSchema} from "./UserDetailsRegisterForm";
import {useEffect, useState} from "react";
import AddressRegisterForm from "./AddressRegisterForm";
import appClient from "../../client/appClient";
import AuthButton from "../../components/AuthButton";

const validationSchema = Yup.object().shape({
  ...baseFormValidationSchema,
  ...userDetailsValidationSchema
})

const RegisterPage = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      // const appClient = defaultAppFactory(
      //   "http://localhost:3001"
      // )

      const result = await appClient.posts.getAll()
      console.log("result: ", result);
    }

    // fetchData();
  }, [register])

  const handleRegister = data => {
    console.log(data)
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