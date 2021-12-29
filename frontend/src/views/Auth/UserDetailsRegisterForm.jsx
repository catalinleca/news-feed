import * as React from "react";
import * as Yup from "yup";
import {Grid, TextField, Typography} from "@mui/material";

export const baseFormValidationSchema = {
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name must be at least 6 characters')
    .max(20, 'Name must not exceed 20 characters'),
  phone: Yup.number()
    .required('Name is required'),
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
        spacing={1}
      >
        <Grid item xs={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            margin="dense"
            {...register('name')}
            error={!!errors.name}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.name?.message}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            margin="dense"
            {...register('phone')}
            error={!!errors.phone}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.phone?.message}
          </Typography>
        </Grid>


      </Grid>
    </Grid>
  </React.Fragment>
)


export default AddressRegisterForm;