import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Database/database";
import { AdminContextType, AdminDetailsType } from "../Types/Types";

const authContext = createContext<AdminContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("tlf@id"));
  const navigate = useNavigate();

  const login = async (details: AdminDetailsType) => {
    let res;
    try {
      res = await signIn(details);
      if (res === 500 || res === 429) {
        return res;
      }
      setToken(res);
      sessionStorage.setItem("tlf@id", res);
      navigate("/home");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
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
