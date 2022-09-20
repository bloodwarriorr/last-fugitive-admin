import React, { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AdminContext";
import RequireAuth from "./Utils/RequireAuth";
import Levels from "./Pages/Levels/Levels";
import Footer from "./Components/Footer";
import InvalidPage from "./Utils/InvalidPage";
import Home from "./Pages/Home";
import Users from "./Pages/Users/Users";

type Props = {};

const Router: React.FC<Props> = () => {
  const [dashboardRefershKey, setDashboardRefershKey] = useState(0);
  const [levelRefershKey, setLevelRefershKey] = useState(0);
  return (
    <AuthProvider>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route
            path="/home/"
            element={
              <Dashboard
                key={dashboardRefershKey}
                setRefreshKey={() => setDashboardRefershKey((key) => key + 1)}
              />
            }
          />
          <Route
            path="/home/levels"
            element={
              <Levels
                key={levelRefershKey}
                setRefreshKey={() => setLevelRefershKey((key) => key + 1)}
              />
            }
          />
          <Route path="/home/users" element={<Users />} />
          {/* <Route path="/home/*" element={<InvalidPage />} /> */}
        </Route>

        <Route path="*" element={<InvalidPage />} />
      </Routes>

      <Footer />
    </AuthProvider>
  );
};

export default Router;
