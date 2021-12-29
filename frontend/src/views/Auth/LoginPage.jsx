import * as Yup from "yup";
import * as React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
})

const LoginPage = () => {
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

          <Grid
            container
            item={true}
            xs={12}
            justifyContent="center"
          >
            <Grid
              container={true}
              item={true}
              xs={8}
              justifyContent="center"
            >
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="dense"
                  {...register('email')}
                  error={!!errors.email}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  {...register('password')}
                  error={!!errors.password}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>

        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default LoginPage;
