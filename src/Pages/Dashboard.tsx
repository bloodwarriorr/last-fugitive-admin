import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Divider, Typography } from "@mui/material";
import PopularLevelsChart from "../Components/PopularLevelsChart";
import {
  getAmountOfGuests,
  getLevelRankAvg,
  getPopularHours,
  getPopularLevels,
  getTotalRegistrationByYear,
  getAmountOfUsers,
} from "../Database/database";
import { useAuth } from "../Context/AdminContext";
import { useUtilsContext } from "../Context/UtilsContext";
import RegistrationPerYearChart from "../Components/RegisterationPerYearChart";

type Props = {};

const Dashboard = (props: Props) => {
  const { setAlert, setIsLoader } = useUtilsContext();
  const auth = useAuth();
  const [popularLevel, setPopularLevel] = useState();
  const [totalRegister, setTotalRegister] = useState();
  const [levelRankAvg, setLevelRankAvg] = useState();
  const [popularHours, setPopularHours] = useState();
  const [amountOfUsers, setAmountOfUsers] = useState();
  const [amountOfGuests, setAmountOfGuests] = useState();
  const MIN_YEAR = 2021;
  useEffect(() => {
    const initData = async () => {
      setIsLoader(true)
      try {
        const popHour = await getPopularHours(auth?.token!);
        const totRegister = (await getTotalRegistrationByYear(
          auth?.token!,
          MIN_YEAR
        )).sort((a:any,b:any)=>a._id-b._id);
        const levelAvg = await getLevelRankAvg(auth?.token!);
        const popLevel = (await getPopularLevels(auth?.token!)).sort((a:any,b:any)=>a._id-b._id)
        const amountUsers = await getAmountOfUsers(auth?.token!);
        const amountGuests = await getAmountOfGuests(auth?.token!);
        setPopularLevel(popLevel);
        setTotalRegister(totRegister);
        setLevelRankAvg(levelAvg);
        setPopularHours(popHour);
        setAmountOfUsers(amountUsers);
        setAmountOfGuests(amountGuests);
      } catch (error) {
        setAlert({isOpen:true,type:'error'})
      }
      setIsLoader(false)
    };
    initData();
  }, []);

  return (
    <Container maxWidth={"xl"}>
      <Grid container spacing={5} justifyContent={"space-around"}>
        <Grid item xs={10} md={5}>
          <Paper elevation={5}>
            <Box sx={{}} p={3}>
              <Paper>
                <Typography variant={"subtitle1"}>Registered Users</Typography>
              </Paper>
              <Typography variant="h5">{amountOfUsers}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={10} md={5}>
          <Paper elevation={5}>
            <Box sx={{}} p={3}>
              <Paper>
                <Typography variant={"subtitle1"}>Guest Users</Typography>
              </Paper>
              <Typography variant="h5">{amountOfGuests}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box marginBottom={5} marginTop={5}>
        <Divider component="div" variant="fullWidth" />
      </Box>

      <Grid container spacing={5} justifyContent={"space-evenly"}>
        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} minHeight={300}>
              <PopularLevelsChart data={popularLevel!} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} minHeight={300}>
              <RegistrationPerYearChart data={totalRegister!} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={3}></Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={3}></Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
