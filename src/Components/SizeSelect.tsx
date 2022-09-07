import React, { SetStateAction } from "react";
import {
  MenuItem,
  Select,
} from "@mui/material";

type Props = {
  val: number;
  setLevelSize: (val: number) => void;
  options: number[];
};

const SizeSelect: React.FC<Props> = ({ val, options, setLevelSize }) => {
  return (
    <Select
      defaultValue={val}
      id="demo-simple-select-autowidth"
      value={val}
      onChange={(e) => setLevelSize(e.target.value as number)}
      autoWidth
      label="Age"
    >
      {options.map((op,index) => {
        return <MenuItem key={index} value={op}>{op}</MenuItem>;
      })}
    </Select>
  );
};

export default SizeSelect;
