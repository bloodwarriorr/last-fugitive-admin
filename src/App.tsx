import React from "react";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import Router from "./Router";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#D64A2B",
        light: "#BA5B46",
        dark: "#473941",
      },
      secondary: {
        main: "#1E2F45",
        light: "#304259",
      },
      text: {
        primary: "#E3E6EC",
      },
      background: {
        paper: "#283d53",
        default: "#283d53",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;
