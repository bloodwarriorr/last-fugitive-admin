import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";

import React from "react";

type Props = {
  id?: string;
  label: string;
  isDisabled?: boolean;
  isPressed: boolean;
  setIsPressed: () => void;
};

const PositionButton: React.FC<Props> = ({ id, label, isDisabled, isPressed, setIsPressed }) => {
  const tipText = (
    <Typography variant="subtitle1">
      Set {label} By Clicking On The Map
      {label !== "Exit" && (
        <> Or Click On The Current Position Of {label} To Change His Direction</>
      )}
    </Typography>
  );
  return (
    <Box m={1}>
      <Divider orientation="vertical" flexItem>
        {label}
      </Divider>
      <Tooltip title={tipText} arrow describeChild leaveDelay={100}>
        <Button
          id={id}
          variant={!isPressed ? "outlined" : "contained"}
          onClick={setIsPressed}
          disabled={isDisabled}
          color={isPressed ? "error" : "primary"}
        >
          {"Set"}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default PositionButton;
