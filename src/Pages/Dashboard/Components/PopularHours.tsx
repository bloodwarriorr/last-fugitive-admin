import { Box, Divider, Skeleton, Typography, useTheme } from "@mui/material";
import { color } from "@mui/system";
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
  data: { _id: number; Minute: number }[];
};

const PopularHours: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const primary = theme.palette.primary.main;
  const light = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  return (
    <>
      <Typography variant="h6">Popular Playing Hours</Typography>
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
            <XAxis dataKey="_id" tick={{ fill: textColor }} tickFormatter={(t) => `${t}`}>
              <Label
                value="Hours Of The Day →"
                offset={-15}
                fontSize={18}
                position="insideBottom"
                fill={primary}
                style={{ textAnchor: "middle" }}
              />
            </XAxis>
            <YAxis tick={{ fill: textColor }}>
              <Label
                value="Minutes →"
                fontSize={18}
                offset={-10}
                position="insideLeft"
                angle={-90}
                fill={primary}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>

            <Tooltip
              contentStyle={{
                backgroundColor: secondary,
              }}
            />
            <Area
              name="Playing Time"
              type="monotone"
              dataKey="Minute"
              stroke={light}
              fill={primary}
            />
            <Label value={"Minutes"} position={"insideLeft"} angle={-90} />
          </AreaChart>
        ) : (
          <Skeleton animation={"wave"} height={300} sx={{ transform: "none" }} />
        )}
      </ResponsiveContainer>
    </>
  );
};
export default PopularHours;
