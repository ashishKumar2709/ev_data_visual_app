import { EVDataType } from "../interfaces";

self.onmessage = function (e) {
  const data = e?.data;
  const cafvTypeCountMap: { [cafv: string]: number } = {};
  data.forEach((evData: EVDataType) => {
    const cafvType =
      evData["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
    if (!cafvTypeCountMap[cafvType]) {
      cafvTypeCountMap[cafvType] = 1;
    } else {
      cafvTypeCountMap[cafvType]++;
    }
  });
  const cafvTypeCountArr = Object.entries(cafvTypeCountMap)
    .map(([cafv, count]) => ({ cafv, count }))
    .sort();
  self.postMessage({
    cafvTypeCountArr,
  });
};
