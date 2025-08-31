export interface EVDataType {
  "2020 Census Tract": string;
  "Base MSRP": string;
  City: string;
  "Clean Alternative Fuel Vehicle (CAFV) Eligibility": string;
  County: string;
  "DOL Vehicle ID": string;
  "Electric Range": string;
  "Electric Utility": string;
  "Electric Vehicle Type": string;
  "Legislative District": string;
  Make: string;
  Model: string;
  "Model Year": string;
  "Postal Code": string;
  State: string;
  "VIN (1-10)": string;
  "Vehicle Location": string;
}

export interface MakeModelCountDataType {
    name: string;
    [model: string]: string | number;
  }

export interface GraphProps {
  data : EVDataType[];
}

export interface YearlyCountDataType {
  year: string;
  count: number;
}

export interface MakeCountDataType {
  make: string;
  count: number;
}

export interface TypeCountDataType {
  type: string;
  count: number;
}

export interface CafvCountDataType {
  cafv: string;
  count: number;
}

export interface AvgRangeDataType{
    make: string; avgRange: string;
}