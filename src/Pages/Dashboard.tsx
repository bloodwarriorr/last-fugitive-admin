import React from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Divider, Typography } from "@mui/material";
import PopularLevelsChart from "../Components/PopularLevelsChart";

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <Container maxWidth={"xl"}>

      <Grid container spacing={5} justifyContent={'space-around'}>
        
        <Grid item xs={10} md={5}>
          <Paper elevation={5}>
            <Box sx={{}} p={3}>
          <Paper>
              <Typography variant={"subtitle1"}>
                Registered Users
              </Typography>
              </Paper>
              <Typography variant="h5">
                10
              </Typography>
            </Box>
          </Paper>
          
        </Grid>
        <Grid item xs={10} md={5}>
          <Paper elevation={5}>
            <Box sx={{}} p={3}>
          <Paper>
              <Typography variant={"subtitle1"}>
                Guest Users
              </Typography>
              </Paper>
              <Typography variant="h5">
                10
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box marginBottom={5} marginTop={5}>
        <Divider component="div"  variant="fullWidth" />
      </Box>

      <Grid container spacing={5} justifyContent={'space-evenly'}>

        <Grid item xs={12} md={6}>
        <Paper elevation={5}>
            <Box sx={{}} p={3} minHeight={300}>
            <PopularLevelsChart/>

            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
        <Paper elevation={5}>
            <Box sx={{}} p={3}>

            </Box>
          </Paper>
        </Grid>


        <Grid item xs={12} md={6}>
        <Paper elevation={5}>
            <Box sx={{}} p={3}>


            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
        <Paper elevation={5}>
            <Box sx={{}} p={3}>

            </Box>
          </Paper>
        </Grid>
        
      </Grid>
    </Container>
  )
}

export default Dashboard