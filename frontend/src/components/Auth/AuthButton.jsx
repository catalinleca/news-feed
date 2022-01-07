import * as React from "react"
import {Alert, Button, Grid} from "@mui/material";

export const AuthButton = ({label, clickHandler, errors = []}) => {

  const errorMessage = (error, i) => (
    <Alert key={errors.message + i} severity="error">{error.message}</Alert>
  )
  const errorMessages = errors.length ? errors.map(errorMessage) : null


  return (
    <React.Fragment>
      <Grid
        container={true}
        direction="column"
        alignContent="center"
      >
        <Grid
          item={true}
          alignSelf="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={clickHandler}
          >
            {label}
          </Button>
        </Grid>
        <Grid
          alignSelf="center"
          mt={1}
        >
          {errorMessages}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
