import React from "react";
import dynamic from "next/dynamic";
import AllGraphsLoader from "@/component/AllGraphsLoader";
const Graphs = dynamic(() => import("@/component/Graphs"), {
  loading: () => <AllGraphsLoader />,
});

const DashboardPage = () => {
  return (
    <div>
      <Graphs />
    </div>
  );
};

export default DashboardPage;
