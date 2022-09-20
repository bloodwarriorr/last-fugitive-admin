import { Box, Divider, Skeleton, Typography, useTheme } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

type Props = {
  data: { _id: number; Value: number }[];
};

const LevelRankAvg: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const textColor = theme.palette.text.primary;
  const primary = theme.palette.primary.main;
  const light = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
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
              right: 15,
              left: 15,
              bottom: 15,
            }}
            barSize={20}
          >
            <XAxis
              dataKey={"_id"}
              scale="point"
              padding={{ left: 10, right: 10 }}
              tick={{ fill: textColor }}
            >
              <Label
                fontSize={18}
                value="Levels →"
                offset={-15}
                position="insideBottom"
                fill={primary}
                style={{ textAnchor: "middle" }}
              />
            </XAxis>
            <YAxis tick={{ fill: textColor }}>
              <Label
                value="Rank →"
                fontSize={18}
                offset={-5}
                position="insideLeft"
                angle={-90}
                fill={primary}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip contentStyle={{ backgroundColor: secondary }} />
            <CartesianGrid strokeDasharray="3 5" />
            <Bar
              name="Average Rank"
              dataKey="Value"
              stroke={light}
              fill={primary}
              // background={{ fill: theme.palette.secondary.light }}
            />
          </BarChart>
        ) : (
          <Skeleton animation={"wave"} height={300} sx={{ transform: "none" }} />
        )}
      </ResponsiveContainer>
    </>
  );
};

export default LevelRankAvg;
