"use client";
import { useState } from "react";
import { Car } from "../../page";
import Link from "next/link";
import ListOfCars from "../list-of-cars";
import Error from "@/components/error";

export default function MainContent({
  cars,
  year,
}: {
  cars: Car[];
  year: string;
}) {
  const [search, setSearch] = useState("");

  const filteredCars = cars.filter((car) =>
    car.Model_Name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <h1 className="text-5xl font-extrabold mb-8 text-center">
        Car Models for {cars[0]?.Make_Name} ({year})
      </h1>
      <div className="max-w-3xl w-full flex items-center gap-4 mb-4">
        <Link href={"/"}>
          <button className="px-5 py-5 w-[140px] bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold">
            Go Back
          </button>
        </Link>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find model..."
          className="rounded-xl p-5 w-full bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {filteredCars.length > 0 ? (
        <ListOfCars filteredCars={filteredCars} />
      ) : (
        <Error>No models found for this selection.</Error>
      )}
    </>
  );
}
