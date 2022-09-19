import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AdminContext";
import { getAllUsers, getLifes } from "../../Database/database";
import { LifeType, UserType } from "../../Types/Types";
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

  const getUsers = async () => {
    const allUsers = await getAllUsers(auth?.token!);
    setUsers(allUsers);
  };
  //1
  const getLifeDoc = async () => {
    const lifeObj = await getLifes(auth?.token!);
    setLifes(lifeObj[0]);
  };
  return (
    <div>
      {users && <UsersTable users={users} setUsers={(val:any) => setUsers(val)} />}
      <br />
      {lifes && <AddLifes lifes={lifes} />}
    </div>
  );
};

export default Users;
