import { CafvCountDataType, GraphProps } from "@/interfaces";
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
} from "recharts";

const CafvEligibilityPieChart: React.FC<GraphProps> = ({ data }) => {
  const [cafvCountData, setcafvCountData] = React.useState<CafvCountDataType[]>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      const cafvTypeCountMap: { [cafv: string]: number } = {};
      data.forEach((evData) => {
        const cafvType =
          evData["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
        if (!cafvTypeCountMap[cafvType]) {
          cafvTypeCountMap[cafvType] = 1;
        } else {
          cafvTypeCountMap[cafvType]++;
        }
      });
      const cafvTypeCountArr = Object.entries(cafvTypeCountMap)
        .map(([cafv, count]) => ({ cafv, count }))
        .sort();
      setcafvCountData(cafvTypeCountArr);
      setLoading(false);
    }
  }, [data]);

  const COLORS = ["#024b8bff", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <>
      {loading ? (
        <div className="flex justify-center"> Loading...</div>
      ) : (
        <ResponsiveContainer
          width={600}
          height={300}
          className={"border border-gray-600 bg-gray-500"}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={cafvCountData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="count"
              nameKey="cafv"
              label
            >
              {cafvCountData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.cafv}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Tooltip />
            </Pie>
            <Label
              value="CAFV eligibility Piechart"
              name="CAFV eligibility Piechart"
              stroke="#160becff"
              position={"end"}
              offset={-130}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default CafvEligibilityPieChart;
