import React, { createContext, useContext, useState } from "react";
import Alerts from "../Components/Utils/Alerts";
import Loader from "../Components/Utils/Loader";
import { AlertType, UtilsContextType } from "../Types/Types";

export const UtilsContext = createContext<UtilsContextType | null>(null);
type Props = {
  children?:React.ReactNode
}
const UtilsContextProvider: React.FC<Props> = ({ children }) => {
  const [alertSettings, setAlert] = useState<AlertType>({
    isOpen: false,
    type: "error",
  });
  const [isLoader, setIsLoader] = useState(false);

  return (
    <UtilsContext.Provider value={{ setAlert, setIsLoader }}>
      <Loader isLoader={isLoader} setIsLoader={(val) => setIsLoader(val)} />

      <Alerts
        settings={alertSettings}
        setSettings={(settings) => setAlert(settings)}
      />

      {children}
    </UtilsContext.Provider>
  );
};

export default UtilsContextProvider;
export const useUtilsContext = () =>
  useContext(UtilsContext) as UtilsContextType;
