import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContextType, AdminDetailsType } from "../Types/Types";
import { useUtilsContext } from "./UtilsContext";

const authContext = createContext<AdminContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const { setIsLoader, setAlert } = useUtilsContext();
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("tlf@id")
  );
  const navigate = useNavigate();

  const login = (details: AdminDetailsType) => {
    setIsLoader(true);
    setTimeout(() => {
      if (details.email === "admin") {
        setToken("admin123");
        sessionStorage.setItem("tlf@id", "admin123");
        navigate("/Dashboard");
      } else {
        setAlert({isOpen:true,type:'error'})
      }
      setIsLoader(false);
    }, 2000);
  };

  const logout = () => {
    sessionStorage.removeItem("tlf@id");
    setToken(null);
    navigate("/");
  };
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
