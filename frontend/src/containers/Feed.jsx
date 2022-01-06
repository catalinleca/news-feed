import {AddPost, Posts} from "../components";
import {Grid} from "@mui/material";

export const Feed = () => {
  return (
    <Grid
      container={true}
      alignItems="center"
      justifyContent="center"
    >
      <AddPost/>
      <Posts/>
    </Grid>
  )
}