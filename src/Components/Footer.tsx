import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  const theme = useTheme();
  return (
    <Box padding={3} color={theme.palette.text.primary}>
      <Box marginBottom={3} marginTop={3}>
        <Divider component="div" variant="fullWidth" />
      </Box>
      <Typography textAlign={"center"} variant="subtitle2">
        The Last Fugitive © made by K.O Games
      </Typography>
    </Box>
  );
};

export default Footer;
