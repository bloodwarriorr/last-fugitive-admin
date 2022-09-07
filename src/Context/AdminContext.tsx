import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Database/database";
import { AdminContextType, AdminDetailsType } from "../Types/Types";
import { useUtilsContext } from "./UtilsContext";

const authContext = createContext<AdminContextType | null>(null);

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  // const { setIsLoader, setAlert } = useUtilsContext();
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("tlf@id")
  );
  const navigate = useNavigate();

  const login = async (details: AdminDetailsType) => {
    // setIsLoader(true);
    let uid;
    try {
      uid = await signIn(details);
      setToken(uid);
      sessionStorage.setItem("tlf@id", uid);
      navigate("/Dashboard");
    } catch (err) {
      // setAlert({isOpen:true,type:'error'})
    }
 
    // setIsLoader(false);
  };

  const logout = () => {
    sessionStorage.removeItem("tlf@id");
    setToken(null);
    navigate("/");
  };
  console.count('admin context')
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
