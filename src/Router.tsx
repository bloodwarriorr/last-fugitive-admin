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
  const [dashboardRefershKey, setDashboardRefershKey] = useState(0);
  const [levelRefershKey, setLevelRefershKey] = useState(0);
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
                key={dashboardRefershKey}
                setRefreshKey={() => setDashboardRefershKey((key) => key + 1)}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/levels"
          element={
            <RequireAuth>
              <Levels   key={levelRefershKey} setRefreshKey={() => setLevelRefershKey((key) => key + 1)} />
            </RequireAuth>
          }
        />
      </Routes>
      <Footer/>
    </AuthProvider>
  );
};

export default Router;
