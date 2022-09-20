import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const InvalidPage: React.FC<Props> = () => {
  const theme = useTheme();
  return (
    <Box textAlign={"center"} color={theme.palette.text.primary} padding={10}>
      <Typography variant="h3">This Page Does Not Exists!</Typography>
      <Typography variant="h6">
        <Link to="/home" style={{ textDecoration: "none", color: theme.palette.primary.main }}>
          Go Back Home
        </Link>
      </Typography>
    </Box>
  );
};

export default InvalidPage;
