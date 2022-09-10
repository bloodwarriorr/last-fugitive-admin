import React, { SetStateAction } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { AlertType } from "../../Types/Types";
type Props = {
  settings:AlertType
  setSettings:React.Dispatch<SetStateAction<AlertType>>
};

const Alerts:React.FC<Props> = ({settings,setSettings}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSettings({ ...settings, isOpen: false });
  };
  return (
    <Snackbar
      open={settings.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={settings.type as AlertColor}
        sx={{ width: "100%" }}
        variant={"filled"}
      >
        {settings.message}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
