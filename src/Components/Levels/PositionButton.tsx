import { ElectricScooterOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { parse } from "node:path/win32";
import React, { SetStateAction, useEffect, useState } from "react";
import { LevelType } from "../../Types/Types";

type Props = {
  id?: string;
  label: string;
  isDisabled?: boolean;
  isPressed: boolean;
  setIsPressed: () => void;
};

const PositionButton: React.FC<Props> = ({
  id,
  label,
  isDisabled,
  isPressed,
  setIsPressed,
}) => {
  console.log(isPressed)
  return (
    <Box m={1}>
      <Divider orientation="vertical" flexItem>
        {label}
      </Divider>
      <Button
        variant={!isPressed ? "outlined" : "contained"}
        onClick={setIsPressed}
        disabled={isDisabled}
        color={isPressed ? "error" : "primary"}
      >
        {"Set"}
      </Button>
    </Box>
  );
};

export default PositionButton;
