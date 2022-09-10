import { Box, Button, Divider } from "@mui/material";

import React from "react";

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
  return (
    <Box m={1}>
      <Divider orientation="vertical" flexItem>
        {label}
      </Divider>
      <Button
        id={id}
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
