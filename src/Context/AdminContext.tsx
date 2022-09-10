import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerts from "../Components/Utils/Alerts";
import Loader from "../Components/Utils/Loader";
import { signIn } from "../Database/database";
import { AdminContextType, AdminDetailsType, AlertType } from "../Types/Types";

const authContext = createContext<AdminContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("tlf@id")
  );
  const navigate = useNavigate();

  const login = async (details: AdminDetailsType) => {
    let uid;
    try {
      uid = await signIn(details);
      setToken(uid);
      sessionStorage.setItem("tlf@id", uid);
      navigate("/Dashboard");
      return true
    } catch (err) {
      return false
    }
  };

  const logout = () => {
    sessionStorage.removeItem("tlf@id");
    setToken(null);
    navigate("/");
  };
  console.count("admin context");
  return (
    <authContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
