import React from "react";
import GraphLoader from "./GraphLoader";

const AllGraphsLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return <GraphLoader key={item} />;
      })}
    </div>
  );
};

export default AllGraphsLoader;
