import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Alerts from "../../Components/Alerts";
import Loader from "../../Components/Loader";
import { useAuth } from "../../Context/AdminContext";
import { getAllUsers, getLifes } from "../../Database/database";
import { AlertType, LifeType, UserType } from "../../Types/Types";
import AddLifes from "./Components/AddLifes";
import UsersTable from "./Components/UsersTable";

type Props = {};

const Users: React.FC<Props> = () => {
  const auth = useAuth();
  const [users, setUsers] = useState();
  const [lifes, setLifes] = useState();
  useEffect(() => {
    getUsers();
    getLifeDoc();
  }, []);
  const [alertSettings, setAlertSettings] = useState<AlertType>({
    isOpen: false,
    type: "error",
    message: "Error Loading Data...",
  });

  const getUsers = async () => {
    try {
      const allUsers = await getAllUsers(auth?.token!);
      setUsers(allUsers);
    } catch {
      setAlertSettings({ ...alertSettings, isOpen: true });
    }
  };
  //1
  const getLifeDoc = async () => {
    try {
      const lifeObj = await getLifes(auth?.token!);
      setLifes(lifeObj[0]);
    } catch {
      setAlertSettings({ ...alertSettings, isOpen: true });
    }
  };
  return (
    <div>
      <Alerts settings={alertSettings} setSettings={(val) => setAlertSettings(val)} />
      {users ? (
        <UsersTable users={users} setUsers={(val: any) => setUsers(val)} />
      ) : (
        <Skeleton height={300} animation={"wave"} />
      )}
      <br />
      {lifes ? <AddLifes lifes={lifes} /> : <Skeleton height={255} animation={"wave"} />}
    </div>
  );
};

export default Users;
