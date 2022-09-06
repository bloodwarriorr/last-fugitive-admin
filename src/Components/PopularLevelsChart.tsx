import { Box, Divider, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Level 1",
//     pv: 2400,

//   },
//   {
//     name: "Level 2",
//     pv: 1398,
//   },
//   {
//     name: "Level 3",
//     pv: 9800,
//   },
//   {
//     name: "Level 4",
//     pv: 3908,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     pv: 3800,

//   },
//   {
//     name: "Level 5",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

type Props = {
data:{_id:number,Value:number}[]
};

const PopularLevelsChart:React.FC<Props> = ({data}) => {
  return (
    <>
    <Typography variant="h6">Popular Levels</Typography>
    <Box marginBottom={5} marginTop={1}>
        <Divider component="div"  variant="fullWidth" />
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
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
          <Legend  />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar name="Popularity" dataKey="Value" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default PopularLevelsChart;
