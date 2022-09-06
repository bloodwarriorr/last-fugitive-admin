import React from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AdminContext";
import RequireAuth from "./Components/Utils/RequireAuth";
import Navbar from "./Components/NavBar";
import Levels from "./Pages/Levels";

type Props = {};

const Router: React.FC<Props> = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Navbar />
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/levels"
          element={
            <RequireAuth>
              <Navbar />
              <Levels />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
