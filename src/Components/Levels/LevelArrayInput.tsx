import { FormControl, TextField, Typography } from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";

type Props = {
  name: string;
  label: string;
  value?: string;
  changeHandler: (e: string, id?: string) => void;
  levelSize: { y: number; x: number };
  isDisabled?: boolean;
  setLevelObject: (val:number[])=>void
};

const LevelArrayInput: React.FC<Props> = ({
  name,
  label,
  changeHandler,
  isDisabled,
  value,
  levelSize,
  setLevelObject,
}) => {
  const [isError, setIsError] = useState(true);

  const errorHandler = () => {
    const pos = value!.split(",");
    return (
      !parseInt(pos[0]) ||
      !parseInt(pos[1]) ||
      !!value?.match(/^[4-6],[8-9]|[1][0-3]$/)
    );
  };
  useEffect(() => {
    setIsError(errorHandler());
  }, [value]);

  useEffect(() => {
    if (!isError) {
      const pos = value!.split(",");
      const y = parseInt(pos[0]);
      const x = parseInt(pos[1]);
      setLevelObject([y, x]);
    }
  }, [isError]);

  return (
    <FormControl sx={{ m: 1, maxWidth: "93px" }}>
      <Typography variant="subtitle2">{name}</Typography>
      <TextField
        value={value}
        placeholder={label}
        variant="outlined"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeHandler(e.target.value)
        }
        error={isError}
        disabled={isDisabled}
        inputProps={{ maxLength: 4 }}
      />
    </FormControl>
  );
};

export default LevelArrayInput;
