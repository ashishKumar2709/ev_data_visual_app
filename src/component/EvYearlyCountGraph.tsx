"use client";
import { GraphProps, YearlyCountDataType } from "@/interfaces";
import React, { useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

const EvYearlyCountGraph: React.FC<GraphProps> = ({ data }) => {
  const [yearlyCountData, setYearlyCountData] = React.useState<
    YearlyCountDataType[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      const yearCountMap: { [year: string]: number } = {};
      data.forEach((evData) => {
        const year = evData["Model Year"];
        if (!yearCountMap[year]) {
          yearCountMap[year] = 1;
        } else {
          yearCountMap[year]++;
        }
      });
      const yearlyCountArr = Object.entries(yearCountMap)
        .map(([year, count]) => ({ year, count }))
        .sort((a, b) => parseInt(a.year) - parseInt(b.year));
      setYearlyCountData(yearlyCountArr);
      setLoading(false);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center"> Loading...</div>
      ) : (
        <LineChart
          data={yearlyCountData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          width={600}
          height={300}
          className={"border border-gray-600 bg-gray-500"}
        >
          <CartesianGrid stroke="#1808f1ff" />
          <Line
            type="monotone"
            dataKey={"count"}
            stroke="#0c1be9ff"
            strokeWidth={1}
            name="EVs owned count"
          />
          <XAxis dataKey="year" stroke="#00010fcb" />
          <YAxis
            width="auto"
            label={{
              value: "Number of EVs-->",
              position: "insideLeft",
              offset: 10,
              stroke: "#00010fcb",
              angle: -90,
            }}
            stroke="#00010fcb"
          />
          <Legend align="right" />
          <Tooltip />
        </LineChart>
      )}
    </>
  );
};

export default EvYearlyCountGraph;
