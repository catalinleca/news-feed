import * as React from "react";
import * as Yup from "yup";
import {Grid, TextField, Typography} from "@mui/material";

export const baseFormValidationSchema = {
  street: Yup.string()
    .required('Street is required')
    .min(6, 'Street must be at least 6 characters')
    .max(40, 'Street must not exceed 20 characters'),
  city: Yup.string()
    .required('City is required')
    .email('City is invalid'),
  suite: Yup.number()
    .typeError('Suite is required')
    .required('Suite is required'),
}

const AddressRegisterForm = ({useFormProps: {register, control, errors}}) => (
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
            id="street"
            name="street"
            label="Street"
            fullWidth
            margin="dense"
            {...register('street')}
            error={!!errors.street}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.street?.message}
          </Typography>
        </Grid>
        <Grid
          container={true}
          item={true}
          xs={12}
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              margin="dense"
              {...register('city')}
              error={!!errors.city}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.city?.message}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="suite"
              name="suite"
              label="Suite"
              type="suite"
              fullWidth
              margin="dense"
              {...register('suite')}
              error={!!errors.suite}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.suite?.message}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </React.Fragment>
)


export default AddressRegisterForm;