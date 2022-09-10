import { Box, Divider, Skeleton, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

type Props = {
  data: { _id: number; Value: number }[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PopularLevelsChart: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Typography variant="h6">Top 5 Popular Levels</Typography>
      <Box marginBottom={5} marginTop={1}>
        <Divider component="div" variant="fullWidth" />
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        {data ? (
          <PieChart 
          width={500} 
          height={300}
          >
            <Legend layout="horizontal" verticalAlign="bottom" align="center"/>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              nameKey={`_id`}
              label={renderCustomizedLabel}
              outerRadius={'97%'}
              fill="#8884d8"
              dataKey="Value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
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

export default PopularLevelsChart;
