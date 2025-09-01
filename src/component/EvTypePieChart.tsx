import { GraphProps, TypeCountDataType } from "@/interfaces";
import React, { useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import GraphLoader from "./GraphLoader";

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
      {loading ? (
        <GraphLoader />
      ) : (
        <div className="border border-gray-600 rounded text-indigo-900 p-4">
          <ResponsiveContainer width={600} height={300}>
            <PieChart width={400} height={400}>
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
          <p className="text-blue-400 text-center text-sm word-wrap">
            Distribution of Type of EVs
          </p>
        </div>
      )}
    </>
  );
};

export default EvTypePieChart;
