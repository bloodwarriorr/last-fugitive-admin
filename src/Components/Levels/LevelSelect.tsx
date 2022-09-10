import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  id?: string;
  name: string;
  value: string | number;
  options: number[] | string[];
  changeHandler: (e: number|string,id?:string) => void;
  isDisabled?:boolean
};

const LevelSelect: React.FC<Props> = ({
  id,
  name,
  value,
  options,
  changeHandler,
  isDisabled
}) => {
  return (
    <FormControl sx={{ m: 1, width:'93px' }}>
      <Typography variant="subtitle2">{name}</Typography>
      <Select
        defaultValue={String(value)}
        id={id}
        value={String(value)}
        onChange={(e: SelectChangeEvent) => changeHandler(e.target.value,id)}
        autoWidth
        disabled={isDisabled}
      >
        {options.map((op, index) => {
          return (
            <MenuItem key={index} value={op}>
              {op}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default LevelSelect;
