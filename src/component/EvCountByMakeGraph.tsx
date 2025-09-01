"use client";
import { GraphProps, MakeCountDataType } from "@/interfaces";
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

const EvCountByMakeGraph: React.FC<GraphProps> = ({ data }) => {
  const [makeCountData, setMakeCountData] = React.useState<MakeCountDataType[]>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      const manufacturerCountMap: { [make: string]: number } = {};
      data.forEach((evData) => {
        const manufacturer = evData.Make;
        if (!manufacturerCountMap[manufacturer]) {
          manufacturerCountMap[manufacturer] = 1;
        } else {
          manufacturerCountMap[manufacturer]++;
        }
      });
      const makeCountArr = Object.entries(manufacturerCountMap)
        .map(([make, count]) => ({ make, count }))
        .sort();
      setMakeCountData(makeCountArr);
      setLoading(false);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <GraphLoader/>
      ) : (
        <div className="border border-gray-600 rounded text-indigo-900 p-4">
        <ResponsiveContainer
          width={600}
          height={300}
        >
          <BarChart
            data={makeCountData}
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
                value: "Number of EVs--->",
                position: "left",
                offset: 10,
                angle: -90,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#160becff"
              activeBar={<Rectangle fill="orange" stroke="blue" />}
              name={"EVs count of Manufacturer"}
            />
          </BarChart>
        </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default EvCountByMakeGraph;
