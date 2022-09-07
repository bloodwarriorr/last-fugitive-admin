import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Divider, Skeleton, Typography } from "@mui/material";
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
import AnnualRegistration from "../Components/AnnualRegistration";
import SpeedDail from "../Components/Utils/SpeedDial";
import LevelRankAvg from "../Components/LevelRankAvg";
import PopularHours from "../Components/PopularHours";

type Props = {
  setRefreshKey: () => void;
};

const Dashboard: React.FC<Props> = ({ setRefreshKey }) => {
  console.count("dashboard");
  const MIN_YEAR = 2022;
  const auth = useAuth();
  const [popularLevel, setPopularLevel] = useState();
  const [totalRegister, setTotalRegister] = useState();
  const [levelRankAvg, setLevelRankAvg] = useState();
  const [popularHours, setPopularHours] = useState();
  const [amountOfUsers, setAmountOfUsers] = useState();
  const [amountOfGuests, setAmountOfGuests] = useState();
  const currentYear = new Date().getFullYear();
  const [yearSelect, setYearSelect] = useState(currentYear);

  const getRegisterUsers = async () => {
    const amountUsers = await getAmountOfUsers(auth?.token!);
    setAmountOfUsers(amountUsers);
  };
  const getGuestsUser = async () => {
    const amountGuests = await getAmountOfGuests(auth?.token!);
    setAmountOfGuests(amountGuests);
  };
  const getPopLevels = async () => {
    const popLevel = await getPopularLevels(auth?.token!);
    setPopularLevel(popLevel);
  };
  const getPopHours = async () => {
    const popHour = await getPopularHours(auth?.token!);
    setPopularHours(popHour);
  };
  const getLevelAvg = async () => {
    const levelAvg = await getLevelRankAvg(auth?.token!);
    setLevelRankAvg(levelAvg);
  };
  const getAnnualRegistration = async () => {
    const totRegister = await getTotalRegistrationByYear(
      auth?.token!,
      yearSelect
    );
    setTotalRegister(totRegister);
  };
  useEffect(() => {
    console.time("fetch");
    getRegisterUsers();
    getGuestsUser();
    getPopLevels();
    getPopHours();
    getLevelAvg();
    getAnnualRegistration();
  }, []);

  useEffect(() => {
    setTotalRegister(undefined)
    getAnnualRegistration();
  }, [yearSelect]);

  return (
    <Container maxWidth={"xl"}>

      {!(
        popularLevel &&
        totalRegister &&
        levelRankAvg &&
        popularHours &&
        amountOfUsers &&
        amountOfGuests
      ) && <FetchTimer />}

      <Grid container spacing={5} justifyContent={"space-around"}>
        <Grid item xs={10} md={4}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} alignItems={"center"}>
              {amountOfGuests ? (
                <Typography
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  variant={"h5"}
                >
                  <span>Registered Users</span>
                  <span>{amountOfUsers}</span>
                </Typography>
              ) : (
                <Skeleton height={32} animation={"wave"} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={10} md={4}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} alignItems={"center"}>
              {amountOfGuests ? (
                <Typography
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  variant={"h5"}
                >
                  <span>Guests Users</span>
                  <span>{amountOfGuests}</span>
                </Typography>
              ) : (
                <Skeleton height={32} animation={"wave"} />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box marginBottom={5} marginTop={5}>
        <Divider component="div" variant="fullWidth" />
      </Box>

      <Grid container spacing={15} justifyContent={"space-around"}>
        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={"24px 15px"} height={380}>
              <PopularHours data={popularHours!} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box p={"24px 15px"} height={380}>
              <LevelRankAvg data={levelRankAvg!} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={"24px 15px"} height={380}>
              <AnnualRegistration
                data={totalRegister!}
                minYear={MIN_YEAR}
                currentYear={currentYear}
                yearSelect={yearSelect}
                setYearSelect={(year) => setYearSelect(year)}
          
              />
            </Box>
          </Paper>
        </Grid>



        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box p={"24px 15px"} height={380}>
              <PopularLevelsChart data={popularLevel!} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box marginBottom={5} marginTop={5}>
        <Divider component="div" variant="fullWidth" />
      </Box>
      <Box paddingBottom={3}>
        <Typography textAlign={"center"} variant="subtitle2">
          The Last Fugitive © made by K.O Games
        </Typography>
      </Box>
      <SpeedDail refreshData={setRefreshKey} />
    </Container>
  );
};
const FetchTimer = () => {
  useEffect(() => {
    return () => {
      console.timeEnd("fetch");
    };
  }, []);

  return <div></div>;
};

export default Dashboard;
