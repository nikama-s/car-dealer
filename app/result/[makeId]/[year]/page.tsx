import { Suspense } from "react";
import MainContent from "./components/main-content";
import Loader from "@/components/loader";

export interface Car {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("API URL is not defined");
}

async function fetchCars(makeId: string, year: string): Promise<Car[]> {
  const response = await fetch(
    `${apiUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await response.json();
  return data.Results;
}

export async function generateStaticParams() {
  const makesRes = await fetch(
    `${apiUrl}/GetMakesForVehicleType/car?format=json`
  );
  const makesData = await makesRes.json();
  const makes = makesData.Results;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, index) =>
    (2015 + index).toString()
  );
  const paths = makes.flatMap((make: { MakeId: number }) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year,
    }))
  );
  return paths;
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = await params;
  const cars = await fetchCars(makeId, year);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white min-h-screen">
      <Suspense fallback={<Loader />}>
        <MainContent cars={cars} year={year}></MainContent>
      </Suspense>
    </div>
  );
}
