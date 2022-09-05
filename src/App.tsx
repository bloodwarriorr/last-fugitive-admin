import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <Container maxWidth='xl'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;
