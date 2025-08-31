import { EVDataType } from "../interfaces";
import parser from "papaparse";

self.onmessage = async function (e) {
    const response = await fetch(e.data);
      const csvText = await response.text();
      const jsonData = parser.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      }).data as EVDataType[];
  const makeModelCountMap: Record<string, Record<string, number>> = {};
  jsonData?.forEach((evData: EVDataType) => {
    const make = evData.Make;
    const model = evData.Model;
    if (!makeModelCountMap[make]) {
      makeModelCountMap[make] = {};
    }
    makeModelCountMap[make][model] = (makeModelCountMap[make][model] || 0) + 1;
  });
  const makeModelCountArr = Object.entries(makeModelCountMap).map(
    ([make, modelsCountObj]) => ({ name: make, ...modelsCountObj })
  );
  const models = new Set();
  makeModelCountArr.forEach((makeObj) => {
    Object.keys(makeObj).forEach((key) => {
      if (key !== "name") models.add(key);
    });
  });
  self.postMessage({
    makeModelCountArr,
    allModelNames: Array.from(models),
  });
};
