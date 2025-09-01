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
  ResponsiveContainer,
} from "recharts";
import GraphContainer from "./GraphContainer";

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
      <GraphContainer
        loading={loading}
        description="Distribution of Yearly EV Ownership Count"
      >
        <ResponsiveContainer>
          <LineChart
            data={yearlyCountData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            width={600}
            height={300}
          >
            <CartesianGrid stroke="#1808f1ff" />
            <Line
              type="monotone"
              dataKey={"count"}
              stroke="#0c1be9ff"
              strokeWidth={1}
              name="EVs owned count"
            />
            <XAxis dataKey="year" stroke="#f0f0f5cb" />
            <YAxis
              width="auto"
              stroke="#f0f0f5cb"
              label={{
                value: "Number of EVs-->",
                position: "left",
                offset: -10,
                angle: -90,
              }}
            />
            <Legend align="right" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </GraphContainer>
    </>
  );
};

export default EvYearlyCountGraph;
