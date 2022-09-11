import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

type Props = {
  isLoader:boolean;
}

const Loader:React.FC<Props> = (props) => {
  return (
    <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={props.isLoader}
  >
    <CircularProgress thickness={5}/>
  </Backdrop>
  )
}

export default Loader