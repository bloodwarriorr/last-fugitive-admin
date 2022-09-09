import { ElectricScooterOutlined } from "@mui/icons-material";
import {
  FormControl,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { parse } from "node:path/win32";
import React, { SetStateAction, useEffect, useState } from "react";
import { LevelType } from "../../Types/Types";

type Props = {
  id: string;
  name: string;
  label: string;
  value: number;
  min?:number
  changeHandler: (e: string, id: string) => void;
};

const LevelNumberInput: React.FC<Props> = ({
  id,
  name,
  label,
  changeHandler,
  value,
  min
}) => {

  // const errorHandler = () => {
  //     return !!!value && !!parseInt(value);
    
  // };
  // useEffect(() => {
  //   setIsError(errorHandler());
  // },[value]);

  // useEffect(() => {
  //   if(!isError){
  //     setLevelObject(parseInt(value))
  //   }
  // }, [isError])
  

  return (
    <FormControl sx={{ m: 1, maxWidth: "93px" }}>
      <Typography variant="subtitle2">{name}</Typography>
      <TextField
        type={'number'}
        id={id}
        value={value}
        placeholder={label}
        variant="outlined"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeHandler(e.target.value, id)
        }
        inputProps={{ min: min ? min : 4}}
      />
    </FormControl>
  );
};

export default LevelNumberInput;
