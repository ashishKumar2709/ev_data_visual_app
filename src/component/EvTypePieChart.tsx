import { GraphProps, TypeCountDataType } from "@/interfaces";
import React, { useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import GraphContainer from "./GraphContainer";

const EvTypePieChart: React.FC<GraphProps> = ({ data }) => {
  const [typeCountData, setTypeCountData] = React.useState<TypeCountDataType[]>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      const evTypeCountMap: { [type: string]: number } = {};
      data.forEach((evData) => {
        const evType = evData["Electric Vehicle Type"];
        if (!evTypeCountMap[evType]) {
          evTypeCountMap[evType] = 1;
        } else {
          evTypeCountMap[evType]++;
        }
      });
      const typeCountArr = Object.entries(evTypeCountMap)
        .map(([type, count]) => ({ type, count }))
        .sort();
      setTypeCountData(typeCountArr);
      setLoading(false);
    }
  }, [data]);
  return (
    <>
      <GraphContainer
        loading={loading}
        description="Distribution of Type of EVs"
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="count"
              data={typeCountData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#82ca9d"
              nameKey={"type"}
              name="EV Type Piechart"
              label
            />
            <Tooltip />
            {/* <Label
                value="EV Type Piechart"
                name="EV Type Piechart"
                stroke="#160becff"
                position="end"
                offset={-120}
              /> */}
          </PieChart>
        </ResponsiveContainer>
      </GraphContainer>
    </>
  );
};

export default EvTypePieChart;
