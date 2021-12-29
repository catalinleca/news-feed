import * as React from "react";
import * as Yup from "yup";
import {Grid, TextField, Typography} from "@mui/material";

export const baseFormValidationSchema = {
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(40, 'Password must not exceed 40 characters')
    .oneOf([
      Yup.ref('password'), null
    ], "Password must match")
}

const BaseRegisterForm = ({useFormProps: {register, errors}}) => (
  <React.Fragment>
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
            id="username"
            name="username"
            label="username"
            fullWidth
            margin="dense"
            {...register('username')}
            error={!!errors.username}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.username?.message}
          </Typography>
        </Grid>
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
        <Grid item xs={12}>
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="dense"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.confirmPassword?.message}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
)


export default BaseRegisterForm;