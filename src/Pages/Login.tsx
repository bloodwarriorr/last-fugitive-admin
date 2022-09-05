import { Box, Grid, Paper, TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <Grid
      container
      spacing={2}
      height={"100vh"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Grid item xs={10} md={5}>
        <Paper elevation={5}>
          <Stack spacing={2} p={5}>
            <TextField label="Email" variant="outlined" />
            <TextField
              label="Password"
              variant="outlined"
            />
            <Button variant="contained">Submit</Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
