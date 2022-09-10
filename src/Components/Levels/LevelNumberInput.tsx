import { FormControl, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  value: number;
  min?: number;
  changeHandler: (e: string, id: string) => void;
};

const LevelNumberInput: React.FC<Props> = ({
  id,
  name,
  label,
  changeHandler,
  value,
  min,
}) => {
  return (
    <FormControl sx={{ m: 1, maxWidth: "93px" }}>
      <Typography variant="subtitle2">{name}</Typography>
      <TextField
        type={"number"}
        id={id}
        value={value}
        placeholder={label}
        variant="outlined"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeHandler(e.target.value, id)
        }
        inputProps={{ min: min ? min : 4 }}
      />
    </FormControl>
  );
};

export default LevelNumberInput;
