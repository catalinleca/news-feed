import * as Yup from "yup";
import * as React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import BaseRegisterForm, {baseFormValidationSchema} from "./BaseRegisterForm";
import UserDetailsRegisterForm from "./UserDetailsRegisterForm";

const validationSchema = Yup.object().shape({
  ...baseFormValidationSchema
})

const RegisterPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <React.Fragment>
      <Paper>
        <Box px={3} py={2} mt={3}>
          <Typography variant="h6" align="center" margin="dense">
            Login
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
              errors
            }}
          />
          <Grid mt={3} container={true} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default RegisterPage;