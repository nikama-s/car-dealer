import { Car } from "../../page";

export default function ListOfCars({ filteredCars }: { filteredCars: Car[] }) {
  return (
    <ul className="w-full max-w-3xl grid grid-cols-1 gap-6 max-h-960 overflow-y-auto hide-scrollbar border-2 border-gray-700 rounded-xl p-5">
      {filteredCars.map((car, i) => (
        <li
          key={car.Model_ID + i}
          className="border border-gray-600 p-6 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-300"
        >
          <p className="text-2xl font-semibold">
            {car.Make_Name} - {car.Model_Name}
          </p>
          <p className="text-lg text-gray-400 mt-1">Model ID: {car.Model_ID}</p>
        </li>
      ))}
    </ul>
  );
}
