import { GraphProps, MakeModelCountDataType } from "@/interfaces";
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Label,
} from "recharts";

const ModelCountStackedGraph: React.FC<GraphProps> = ({ data }) => {
  const [makeModelCountData, setMakeModelCountData] = React.useState<
    MakeModelCountDataType[]
  >([]);
  const [allModelNames, setAllModelNames] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const csvFilePath = "/Electric_Vehicle_Population_Data.csv";
  
  useEffect(() => {
   if (data.length > 0 && typeof window !== 'undefined') {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const worker = new Worker(new URL('../workers/makeModelWorker.ts', import.meta.url));
      worker.postMessage(csvFilePath);
      worker.onmessage = (e: MessageEvent) => {
        setMakeModelCountData(e.data.makeModelCountArr);
        setAllModelNames(e.data.allModelNames);
        setLoading(false);
        worker.terminate();
      };
    }, 0);

    return () => clearTimeout(timeoutId);
  }
  }, [data]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center border border-gray-600 w-600 h-300 animate-pulse"> Loading...</div>
      ) : (
        <ResponsiveContainer
          width={600}
          height={300}
          className={"border border-gray-600 bg-gray-500"}
        >
          <BarChart
            data={makeModelCountData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#1808f1ff" />
            <XAxis dataKey="name" stroke="#00010fcb" />
            <YAxis
              stroke="#00010fcb"
              label={{
                value: "Number of EVs--->",
                position: "insideLeft",
                offset: -10,
                stroke: "#00010fcb",
                angle: -90,
              }}
              name="Popular models by manufacturers"
            />
            <Tooltip />
            {allModelNames.map((model, idx) => (
              <Bar
                key={model}
                dataKey={model}
                stackId="a"
                fill={COLORS[idx % COLORS.length]}
                name={model}
              />
            ))}
             <Label
                          value="Popular models by manufacturers"
                          name="Popular models by manufacturers"
                          stroke="#25ec0bff"
                          position={"centerBottom"}
                          offset={40}
                        />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ModelCountStackedGraph;
