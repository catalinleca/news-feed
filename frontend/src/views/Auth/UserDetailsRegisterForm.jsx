import * as React from "react";
import * as Yup from "yup";
import {Autocomplete, Grid, MenuItem, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import appClient from "../../client/appClient";

export const userDetailsValidationSchema = {
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name must be at least 6 characters')
    .max(20, 'Name must not exceed 20 characters'),
  phone: Yup.number()
    .typeError('Amount must be a number')
    .required('Phone is required'),
  company: Yup.object()
    .typeError('Company is required')
    .required('Company is required')
}

const UserDetailsRegisterForum = ({useFormProps: {register, errors, setValue}}) => {
  const [companyOptions, setCompanyOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      const result = await appClient.companies.getAll()
      setCompanyOptions(result.data)
    }

    fetchData();
  }, [])

  return (
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

          {(
            companyOptions && companyOptions.length) ?
            (<Grid item xs={12}>
              <Autocomplete
                options={companyOptions}
                getOptionLabel={(option) => option.name}
                {...register('company')}
                id="select-company"
                disableListWrap
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a company"
                    variant="standard"
                    error={!!errors.company}
                  />
                )}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.id}>
                    {option.name}
                  </MenuItem>
                )}
                onChange={(e, options) => setValue('company', options)}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.company?.message}
              </Typography>
            </Grid>) : ""
          }
        </Grid>
      </Grid>
    </React.Fragment>
  )

}

export default UserDetailsRegisterForum;