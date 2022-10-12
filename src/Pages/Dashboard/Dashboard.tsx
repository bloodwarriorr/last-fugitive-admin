import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Divider, Skeleton, Typography, useTheme } from "@mui/material";
import PopularLevelsChart from "./Components/PopularLevelsChart";
import {
  getAmountOfGuests,
  getLevelRankAvg,
  getPopularHours,
  getPopularLevels,
  getTotalRegistrationByYear,
  getAmountOfUsers,
  getGameTotalPopularAvg,
  getGameTotalPlayTime,
} from "../../Database/database";
import { useAuth } from "../../Context/AdminContext";
import AnnualRegistration from "./Components/AnnualRegistration";
import SpeedDail from "../../Components/SpeedDial";
import LevelRankAvg from "./Components/LevelRankAvg";
import PopularHours from "./Components/PopularHours";
import Alerts from "../../Components/Alerts";
import { AlertType } from "../../Types/Types";
import Users from "../Users/Users";
type Props = {
  setRefreshKey: () => void;
};

const Dashboard: React.FC<Props> = ({ setRefreshKey }) => {
  const MIN_YEAR = 2022;
  const auth = useAuth();

  const [totalPlayTime, setTotalPlayTime] = useState();
  const [totalPopularity, setTotalPopularity] = useState();
  const [popularLevel, setPopularLevel] = useState();
  const [totalRegister, setTotalRegister] = useState();
  const [levelRankAvg, setLevelRankAvg] = useState();
  const [popularHours, setPopularHours] = useState();
  const [amountOfUsers, setAmountOfUsers] = useState();
  const [amountOfGuests, setAmountOfGuests] = useState();
  const [alertSettings, setAlertSettings] = useState<AlertType>({
    isOpen: false,
    type: "error",
    message: "Error Fetching Some Of The Data... Try Again Later",
  });
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
  const getAnnualRegistration = async (year: number) => {
    const totRegister = await getTotalRegistrationByYear(auth?.token!, year);
    setTotalRegister(totRegister);
  };

  //2
  const getTotalPopularity = async () => {
    const popularity = await getGameTotalPopularAvg(auth?.token!);
    setTotalPopularity(popularity);
  };
  //3
  const getTotalPlayTime = async () => {
    const totalPlayTime = await getGameTotalPlayTime(auth?.token!);
    setTotalPlayTime(totalPlayTime);
  };

  const handleYearChange = (year: number) => {
    setYearSelect(year);
    getAnnualRegistration(year);
  };

  useEffect(() => {
    getRegisterUsers();
    getGuestsUser();
    getPopLevels();
    getPopHours();
    getLevelAvg();
    getAnnualRegistration(currentYear);
    getTotalPopularity();
    getTotalPlayTime();
  }, []);
  const theme = useTheme();
  return (
    <Container maxWidth={"xl"}>
      <Alerts settings={alertSettings} setSettings={(val) => setAlertSettings(val)} />
      <Grid container spacing={5} justifyContent={"space-around"}>
        <Grid item xs={10} md={3}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} alignItems={"center"}>
              {amountOfGuests ? (
                <Box textAlign="center">
                  <Typography variant={"h5"}>Registered Users</Typography>
                  <Typography color={theme.palette.primary.main} variant={"h4"}>
                    {amountOfUsers}
                  </Typography>
                </Box>
              ) : (
                <Skeleton height={73} animation={"wave"} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={10} md={3}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} alignItems={"center"}>
              {amountOfGuests ? (
                <Box textAlign={"center"}>
                  <Typography justifyContent={"space-between"} alignItems={"center"} variant={"h5"}>
                    Guests Users
                  </Typography>
                  <Typography color={theme.palette.primary.main} variant={"h4"}>
                    {amountOfGuests}
                  </Typography>
                </Box>
              ) : (
                <Skeleton height={73} animation={"wave"} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={10} md={3}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} alignItems={"center"}>
              {totalPlayTime ? (
                <Box
                  textAlign={"center"}
                  display="flex"
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <Typography variant={"h5"}>Total Game Time</Typography>
                  <Box display={"flex"} width="50%" justifyContent="space-around" alignItems={'flex-end'}>
                    <Typography color={theme.palette.primary.main} variant={"h4"}>
                      {totalPlayTime}
                    </Typography>
                    <Typography color={theme.palette.primary.main} variant={"h6"}>
                      min
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Skeleton height={73} animation={"wave"} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={10} md={3}>
          <Paper elevation={5}>
            <Box sx={{}} p={3} alignItems={"center"}>
              {totalPopularity ? (
                <Box textAlign={"center"}>
                  <Typography variant={"h5"}>Game Popularity</Typography>
                  <Typography color={theme.palette.primary.main} variant={"h4"}>
                    {totalPopularity} / 5
                  </Typography>
                </Box>
              ) : (
                <Skeleton height={73} animation={"wave"} />
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
            <Box sx={{}} p={"24px 15px"} height={440}>
              <PopularHours data={popularHours!} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box p={"24px 15px"} height={440}>
              <LevelRankAvg data={levelRankAvg!} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box sx={{}} p={"24px 15px"} height={440}>
              <AnnualRegistration
                data={totalRegister!}
                minYear={MIN_YEAR}
                currentYear={currentYear}
                yearSelect={yearSelect}
                setTotalRegister={() => setTotalRegister(undefined)}
                handleYearChange={(year: number) => handleYearChange(year)}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={5}>
            <Box p={"24px 15px"} height={440}>
              <PopularLevelsChart data={popularLevel!} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <SpeedDail refreshData={setRefreshKey} />
    </Container>
  );
};

export default Dashboard;
