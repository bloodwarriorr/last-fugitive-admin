import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/AdminContext';


type Props = {
  children?: any;
}

const RequireAuth:React.FC<Props> = ({children}) => {
  const auth = useAuth();
  return auth?.token ? (
    children
  ) : (
    <Navigate to="/"/>
  );
}

export default RequireAuth