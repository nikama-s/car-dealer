import MainContent from "./components/main-content";

export interface Car {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

async function fetchCars(makeId: string, year: string): Promise<Car[]> {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await response.json();
  console.log(data.Results);
  return data.Results;
}

export async function generateStaticParams() {
  const makesRes = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
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
      <MainContent cars={cars} year={year}></MainContent>
    </div>
  );
}
