import React, { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AdminContext";
import RequireAuth from "./Components/Utils/RequireAuth";
import Navbar from "./Components/NavBar";
import Levels from "./Pages/Levels";
import Footer from "./Components/Footer";

type Props = {};

const Router: React.FC<Props> = () => {
  const [refershKey, setRefershKey] = useState(0);
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard
                key={refershKey}
                setRefreshKey={() => setRefershKey((key) => key + 1)}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/levels"
          element={
            <RequireAuth>
              <Levels />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer/>
    </AuthProvider>
  );
};

export default Router;
