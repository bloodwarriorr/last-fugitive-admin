import { Box, Divider, Skeleton, Typography } from "@mui/material";
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
  data: { _id: number; Minute: number }[];
};

const PopularHours: React.FC<Props> = ({ data }) => {

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
              name="Playing Time"
              type="monotone"
              dataKey="Minute"
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
export default PopularHours;
