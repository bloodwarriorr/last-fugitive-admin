import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  minYear: number;
  data: { _id: number; Value: number }[] | null;
  currentYear: number;
  yearSelect: number;
  handleYearChange: (year:number)=>void
  setTotalRegister: ()=>void
};

const AnnualRegistration: React.FC<Props> = ({
  data,
  minYear,
  currentYear,
  yearSelect,
  handleYearChange,
  setTotalRegister
}) => {
  const handleChange = (e: any) => {
    setTotalRegister()
    handleYearChange(e.target.value);
  };
  return (
    <>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid item>
          <Typography variant="h6">Annual Registration</Typography>
        </Grid>
        <Grid item>
          <Select
            variant="standard"
            defaultValue={yearSelect}
            value={yearSelect}
            onChange={handleChange}
          >
            {[...Array(currentYear + 2 - minYear)].map((y, index) => {
              return (
                <MenuItem key={index} value={minYear + index}>
                  {minYear + index}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
      <Box marginBottom={5} marginTop={1}>
        <Divider component="div" variant="fullWidth" />
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        {data ? (
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Area
              name="users"
              type="monotone"
              dataKey="Value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        ) : (
          <Skeleton
            animation={"wave"}
            height={300}
            sx={{ transform: "none" }}
          />
        )}
      </ResponsiveContainer>
    </>
  );
};
export default AnnualRegistration;
