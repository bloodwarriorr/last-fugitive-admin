import {
  Grid,
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { AlertType, LifeFullType, LifeType } from "../../../Types/Types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { updateLifeDoc } from "../../../Database/database";
import { useAuth } from "../../../Context/AdminContext";
import Loader from "../../../Components/Loader";
import Alerts from "../../../Components/Alerts";
type Props = {
  lifes: LifeFullType;
};

const AddLifes: React.FC<Props> = ({ lifes }) => {
  const auth = useAuth();
  const [userDate, setUserDate] = useState<Dayjs | null>(dayjs());
  const [guestDate, setGuestDate] = useState<Dayjs | null>(dayjs());
  const [userSelect, setUserSelect] = useState(1);
  const [guestSelect, setGuestSelect] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [alertSettings, setAlertSettings] = useState<AlertType>({
    isOpen: false,
    type: "error",
    message: "Error Loading Data...",
  });
  const clickHandler = async () => {
    setIsLoader(true);
    const obj = {
      user: {
        amount: userSelect,
        dueTo: userDate?.toDate(),
      },
      guest: {
        amount: guestSelect,
        dueTo: guestDate?.toDate(),
      },
    };
    try {
      await updateLifeDoc(auth?.token!, obj);
      setAlertSettings({ isOpen: true, type: "success", message: "Updated Successfully" });
    } catch {
      setAlertSettings({
        isOpen: true,
        type: "error",
        message: "Error Updating Data... Try Again Later",
      });
    }
    setIsLoader(false);
  };

  return (
    <>
      <Alerts settings={alertSettings} setSettings={(val) => setAlertSettings(val)} />
      <Loader isLoader={isLoader} />
      <Paper>
        <Box padding={2}>
          <Typography variant="h6">Add Lifes To Users</Typography>
          <Divider flexItem />

          <Grid container p={3} width={"100%"} justifyContent={"space-around"}>
            <Grid item xs={10} md={5}>
              <Typography variant="subtitle2">Registered Users</Typography>
              <Divider sx={{ padding: "3px" }} />
              <Box display={"flex"} flexDirection="column">
                <Typography variant="subtitle1">
                  Default Amount : {lifes.registeredUserLife}
                </Typography>
                <Box gap={2} display={"flex"} paddingTop={2} paddingBottom={2}>
                  <FormControl>
                    <InputLabel id="userLifes">Lifes To Add</InputLabel>
                    <Select
                      labelId="userLifes"
                      // id="demo-simple-select"
                      value={userSelect}
                      label="Life To Add"
                      onChange={(e: any) => setUserSelect(e.target.value)}
                    >
                      {[...Array(9)].map((num, idx) => {
                        return (
                          <MenuItem key={idx} value={idx + 1}>
                            {idx + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="End Upgrade Date"
                      inputFormat="DD/MM/YYYY"
                      minDate={dayjs()}
                      value={userDate}
                      onChange={(e: Dayjs | null) => setUserDate(e)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={10} md={5}>
              <Typography variant="subtitle2">Guests Users</Typography>
              <Divider sx={{ padding: "3px" }} />
              <Box display={"flex"} flexDirection="column">
                <Typography variant="subtitle1">Default Amount : {lifes.guestUserLife}</Typography>
                <Box gap={2} display={"flex"} paddingTop={2} paddingBottom={2}>
                  <FormControl>
                    <InputLabel id="GuestLifes">Lifes To Add</InputLabel>
                    <Select
                      labelId="GuestLifes"
                      value={guestSelect}
                      label="Life To Add"
                      onChange={(e: any) => setGuestSelect(e.target.value)}
                    >
                      {[...Array(9)].map((num, idx) => {
                        return (
                          <MenuItem key={idx} value={idx + 1}>
                            {idx + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="End Upgrade Date"
                      inputFormat="DD/MM/YYYY"
                      minDate={dayjs()}
                      value={guestDate}
                      onChange={(e: Dayjs | null) => setGuestDate(e)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ margin: 2 }} />
          <Box display={"flex"} width={"100%"} justifyContent={"center"}>
            <Button variant="contained" onClick={clickHandler} sx={{ width: "20%" }}>
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default AddLifes;
