"use client";
import React from "react";
import parser from "papaparse";
import { EVDataType } from "@/interfaces";
import EvYearlyCountGraph from "./EvYearlyCountGraph";
import EvCountByMakeGraph from "./EvCountByMakeGraph";
import EvTypePieChart from "./EvTypePieChart";
import CafvEligibilityPieChart from "./CafvEligibilityPieChart";
import ModelCountStackedGraph from "./ModelCountStackedGraph";
import AvgElectricRangeByMakeGraph from "./AvgElectricRangeByMakeGraph";

const Graphs = () => {
  const [data, setData] = React.useState<EVDataType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const csvFilePath = "/Electric_Vehicle_Population_Data.csv";
  React.useEffect(() => {
    const fetchData = async () => {
    setLoading(true);
      const response = await fetch(csvFilePath);
      const csvText = await response.text();
      const jsonData = parser.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      }).data as EVDataType[];
      setData(jsonData);
    setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="text-black flex justify-center items-center p-4">
      {loading ? (
        <div className="flex justify-center items-center m-4 text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 justify-center items-center gap-6">
          <EvYearlyCountGraph data={data} />
          <EvCountByMakeGraph data={data} />
          <EvTypePieChart data={data} />
          <CafvEligibilityPieChart data={data} />
          <ModelCountStackedGraph data={data} />
          <AvgElectricRangeByMakeGraph data={data}/>
        </div>
      )}
    </div>
  );
};

export default Graphs;
