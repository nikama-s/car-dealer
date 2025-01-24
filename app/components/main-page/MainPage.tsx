"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Dropdown from "../menu-with-search";

interface carsType {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

function findAllMakes(arr: carsType[]) {
  const makeNames = new Set<string>();
  for (let i = 0; i < arr.length; i++) {
    makeNames.add(arr[i].MakeName);
  }
  const sortedMakes = Array.from(makeNames).sort();
  return sortedMakes;
}

export default function Home() {
  const {
    data: cars = [],
    isLoading,
    isError,
  } = useQuery<carsType[]>({
    queryKey: ["cars"],
    queryFn: async () => {
      const data = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const res = await data.json();
      return res.Results;
    },
  });
  const allMakes = useMemo(() => findAllMakes(cars), [cars]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () =>
      Array.from({ length: currentYear - 2015 + 1 }, (_, index) =>
        (2015 + index).toString()
      ),
    [currentYear]
  );

  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMakeOpen, setIsMakeOpen] = useState(false);

  const [carMake, setCarMake] = useState("");
  const [yearMake, setYearMake] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white ">
      <h1 className="text-4xl font-bold">Car Dealers App</h1>
      <p className="text-lg mt-2 opacity-90">Find your dream car</p>
      <div className="p-5 pb-4">
        <Dropdown
          options={allMakes}
          placeholder="Select a car make..."
          disabled={isYearOpen}
          isOpen={isMakeOpen}
          setIsOpen={setIsMakeOpen}
          selectedValue={carMake}
          setSelectedValue={setCarMake}
        ></Dropdown>
      </div>
      <div className="p-5 pt-0">
        <Dropdown
          options={years}
          placeholder="Select a year..."
          disabled={isMakeOpen}
          isOpen={isYearOpen}
          setIsOpen={setIsYearOpen}
          selectedValue={yearMake}
          setSelectedValue={setYearMake}
        ></Dropdown>
      </div>
      <button
        className="px-6 py-2 bg-gray-500 hover:bg-gray-700 rounded-lg text-white font-semibold disabled:bg-gray-800 disabled:cursor-not-allowed"
        disabled={!carMake || !yearMake}
      >
        Next
      </button>
    </div>
  );
}
