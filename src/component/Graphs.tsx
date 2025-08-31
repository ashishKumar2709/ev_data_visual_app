"use client";
import React from "react";
import parser from "papaparse";
import { EVDataType } from "@/interfaces";
import dynamic from "next/dynamic";
import GraphLoader from "./GraphLoader";
import AllGraphsLoader from "./AllGraphsLoader";
const EvYearlyCountGraph = dynamic(() => import('./EvYearlyCountGraph'), {
  loading: () => <GraphLoader/>,
});
const EvCountByMakeGraph = dynamic(() => import('./EvCountByMakeGraph'), {
  loading: () => <GraphLoader/>,
});
const EvTypePieChart = dynamic(() => import('./EvTypePieChart'), {
  loading: () => <GraphLoader/>,
});
const CafvEligibilityPieChart = dynamic(() => import('./CafvEligibilityPieChart'), {
  loading: () => <GraphLoader/>,
});
const ModelCountStackedGraph = dynamic(() => import('./ModelCountStackedGraph'), {
  loading: () => <GraphLoader/>,
});
const AvgElectricRangeByMakeGraph = dynamic(() => import('./AvgElectricRangeByMakeGraph'), {
  loading: () => <GraphLoader/>,
});


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
        <AllGraphsLoader/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 w-full">
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
