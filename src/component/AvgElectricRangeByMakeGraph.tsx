import { AvgRangeDataType, GraphProps } from "@/interfaces";
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
} from "recharts";
import GraphLoader from "./GraphLoader";

const AvgElectricRangeByMakeGraph: React.FC<GraphProps> = ({ data }) => {
  const [avgRangeData, setAvgRangeData] = React.useState<AvgRangeDataType[]>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      const rangeSumByMakeMap: { [make: string]: number } = {};
      const evCountByMake: { [make: string]: number } = {};
      data.forEach((evData) => {
        const make = evData.Make;
        const range = parseInt(evData["Electric Range"]);
        if (!rangeSumByMakeMap[make] && !isNaN(range) && !evCountByMake[make]) {
          rangeSumByMakeMap[make] = range;
          evCountByMake[make] = 1;
        } else {
          rangeSumByMakeMap[make] += range;
          evCountByMake[make] += 1;
        }
      });
      const makeCountArr = Object.keys(rangeSumByMakeMap)
        .map((make) => ({
          make,
          avgRange: (rangeSumByMakeMap[make] / evCountByMake[make]).toFixed(2),
        }))
        .sort((a, b) => Number(a.avgRange) - Number(b.avgRange));
      setAvgRangeData(makeCountArr);
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
            <BarChart
              data={avgRangeData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#1808f1ff" />
              <XAxis dataKey="make" stroke="#f0f0f5cb" />
              <YAxis
                stroke="#f0f0f5cb"
                label={{
                  value: "Avg Range of EVs--->",
                  position: "left",
                  offset: -10,
                  angle: -90,
                }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="avgRange"
                fill="#160becff"
                activeBar={<Rectangle fill="orange" stroke="#160becff" />}
                name={"Avg electric range"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default AvgElectricRangeByMakeGraph;
