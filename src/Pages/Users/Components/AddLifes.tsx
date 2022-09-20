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
import { LifeFullType, LifeType } from "../../../Types/Types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { updateLifeDoc } from "../../../Database/database";
import { useAuth } from "../../../Context/AdminContext";
type Props = {
  lifes: LifeFullType;
};

const AddLifes: React.FC<Props> = ({ lifes }) => {
  const auth = useAuth();
  const [userDate, setUserDate] = useState<Dayjs | null>(dayjs());
  const [guestDate, setGuestDate] = useState<Dayjs | null>(dayjs());
  const [userSelect, setUserSelect] = useState(1);
  const [guestSelect, setGuestSelect] = useState(1);

  const clickHandler = async () => {
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
      console.log("Sucssfuly");
    } catch {
      console.log("error");
    }
  };

  return (
    <Paper>
      <Box padding={2}>
        <Typography variant="h6">Add Lifes To Users</Typography>
        <Divider flexItem />

        <Grid container p={3} width={"100%"} justifyContent={"space-around"}>
          <Grid item xs={10} md={5}>
            <Typography variant="subtitle2">Registered Users</Typography>
            <Divider />
            <Box display={'flex'} justifyContent={"center"}>
              <Typography variant="subtitle1">
                Default Amount : {lifes.registeredUserLife}
              </Typography>
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
          </Grid>

          <Grid item xs={10} md={5}>
            <Typography variant="subtitle2">Guests Users</Typography>
            <Divider />
            <Box>
              <Typography variant="subtitle1">Default Amount : {lifes.guestUserLife}</Typography>
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
          </Grid>
        </Grid>
        <Button variant="contained" onClick={clickHandler}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default AddLifes;
