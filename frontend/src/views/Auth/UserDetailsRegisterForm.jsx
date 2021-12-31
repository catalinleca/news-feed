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

const companyOptions = [
  {
    "id": 2,
    "userId": 1,
    "title": "O fut pe ma-ta",
    "body": "Mare descriere",
    "createdAt": "2021-12-26T21:18:50.272Z",
    "updatedAt": "2021-12-26T21:18:50.272Z"
  },
  {
    "id": 3,
    "userId": 1,
    "title": "O fut pe ma-ta",
    "body": "Mare descriere",
    "createdAt": "2021-12-26T21:25:14.270Z",
    "updatedAt": "2021-12-26T21:25:14.270Z"
  },
  {
    "id": 7,
    "userId": 1,
    "title": "logat cu user 2, creat pentru user 1",
    "body": "Mare descriere",
    "createdAt": "2021-12-26T23:45:54.625Z",
    "updatedAt": "2021-12-26T23:45:54.625Z"
  },
  {
    "id": 8,
    "userId": 1,
    "title": "Updated with patch again 2",
    "body": "Mare descriere",
    "createdAt": "2021-12-27T00:03:56.155Z",
    "updatedAt": "2021-12-27T00:20:27.953Z"
  }
]

const UserDetailsRegisterForum = ({useFormProps: {register, control, errors, setValue}}) => {
  const [companyOptions, setCompanyOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      const result = await appClient.posts.getAll()
      console.log("result: ", result);
      setCompanyOptions(result.data)
    }

    fetchData();
  }, [])

  const onSubmit = data => {
    console.log(data)
  }


  const defaultProps = {
    options: companyOptions,
    getOptionLabel: (option) => option.title,
  };

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
                getOptionLabel={(option) => option.title}
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
                    {option.title}
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