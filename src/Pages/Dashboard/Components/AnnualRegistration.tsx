import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  useTheme,
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
  Label,
} from "recharts";

type Props = {
  minYear: number;
  data: { _id: number; Value: number }[] | null;
  currentYear: number;
  yearSelect: number;
  handleYearChange: (year: number) => void;
  setTotalRegister: () => void;
};

const AnnualRegistration: React.FC<Props> = ({
  data,
  minYear,
  currentYear,
  yearSelect,
  handleYearChange,
  setTotalRegister,
}) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const primary = theme.palette.primary.main;
  const light = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const handleChange = (e: any) => {
    setTotalRegister();
    handleYearChange(e.target.value);
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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
              right: 15,
              left: 15,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tick={{ fill: textColor }} tickFormatter={(t) => months[t]}>
              <Label
                value="Month →"
                offset={-15}
                fontSize={18}
                position="insideBottom"
                fill={primary}
                style={{ textAnchor: "middle" }}
              />
            </XAxis>
            <YAxis tick={{ fill: textColor }}>
              <Label
                value="Amount →"
                fontSize={17}
                offset={-10}
                position="insideLeft"
                angle={-90}
                fill={primary}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip contentStyle={{ backgroundColor: secondary }} />
            <Area name="users" type="monotone" dataKey="Value" stroke={light} fill={primary} />
          </AreaChart>
        ) : (
          <Skeleton animation={"wave"} height={300} sx={{ transform: "none" }} />
        )}
      </ResponsiveContainer>
    </>
  );
};
export default AnnualRegistration;
