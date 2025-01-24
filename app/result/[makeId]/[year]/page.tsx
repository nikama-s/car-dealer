interface Car {
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
      {cars.length > 0 ? (
        <>
          <h1 className="text-5xl font-extrabold mb-8 text-center">
            Car Models for {cars[0].Make_Name} ({year})
          </h1>
          <ul className="w-full max-w-3xl grid grid-cols-1 gap-6 max-h-960 overflow-y-auto hide-scrollbar">
            {cars.map((car, i) => (
              <li
                key={car.Model_ID + i}
                className="border border-gray-600 p-6 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-300"
              >
                <p className="text-2xl font-semibold">
                  {car.Make_Name} - {car.Model_Name}
                </p>
                <p className="text-lg text-gray-400 mt-1">
                  Model ID: {car.Model_ID}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-white text-xl mt-6 font-bold">
          No models found for this selection.
        </p>
      )}
    </div>
  );
}
