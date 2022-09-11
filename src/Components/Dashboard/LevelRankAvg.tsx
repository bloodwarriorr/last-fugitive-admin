import { Box, Divider, Skeleton, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


type Props = {
  data: { _id: number; Value: number }[];
};

const LevelRankAvg: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Typography variant="h6">Average Level Ranking</Typography>
      <Box marginBottom={5} marginTop={1}>
        <Divider component="div" variant="fullWidth" />
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        {data ? (
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 0,
              right: 30,
              left: 0,
              bottom: 0,
            }}
            barSize={20}
          >
            <XAxis
              dataKey={"_id"}
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              name="Average Rank"
              dataKey="Value"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
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

export default LevelRankAvg;
