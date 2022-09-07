import React, { useState } from "react";
import { Container } from "@mui/material";
import { AlertType } from "./Types/Types";
import Loader from "./Components/Utils/Loader";
import Alerts from "./Components/Utils/Alerts";
import Router from "./Router";
import UtilsContextProvider from "./Context/UtilsContext";

function App() {
  return (
    <Container maxWidth="xl">
      {/* <UtilsContextProvider> */}
        <Router />
      {/* </UtilsContextProvider> */}
    </Container>
  );
}

export default App;
