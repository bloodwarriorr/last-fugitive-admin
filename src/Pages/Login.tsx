import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alerts from "../Components/Utils/Alerts";
import Loader from "../Components/Utils/Loader";
import { useAuth } from "../Context/AdminContext";
import { AlertType } from "../Types/Types";

type Props = {};

const Login: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [alertSettings, setAlertSettings] = useState<AlertType>({
    isOpen: false,
    type: "error",
    message: "Wrong Login Credentials...",
  });

  const [loginDetails, setLoginDetails] = useState({
    email: " ",
    password: " ",
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoader(true);
    const res = await auth?.login(loginDetails);
    if (!res) {
      setAlertSettings({ ...alertSettings, isOpen: true });
    }
    setIsLoader(false);
  };

  return (
    <>
      <Loader isLoader={isLoader} />
      <Alerts
        settings={alertSettings}
        setSettings={(val) => setAlertSettings(val)}
      />
      <Grid
        container
        spacing={2}
        height={"calc(100vh - 100px)"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Grid item xs={11} md={5} lg={4}>
          <Paper elevation={5}>
            <form action="post" style={{ display: "contents" }}>
              <Stack spacing={2} p={5}>
                <Typography variant="h4" textAlign={"center"}>
                  Login
                </Typography>
                <Divider />
                <TextField
                  label="Email"
                  variant="outlined"
                  error={!!!loginDetails.email}
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, email: e.target.value })
                  }
                />
                <TextField
                  label="Password"
                  type={"password"}
                  variant="outlined"
                  error={!!!loginDetails.password}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    !loginDetails.email.trim() || !loginDetails.password.trim()
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
