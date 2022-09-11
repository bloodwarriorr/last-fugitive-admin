import React, { useState } from "react";
import { Container } from "@mui/material";
import { AlertType } from "./Types/Types";
import Loader from "./Components/Loader";
import Alerts from "./Components/Alerts";
import Router from "./Router";

function App() {
  return (
    <Container maxWidth="xl">
        <Router />
    </Container>
  );
}

export default App;
