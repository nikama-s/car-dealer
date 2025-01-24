import { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center p-4 text-white max-w-3xl mx-auto mt-5">
      <p className="text-xl">{children}</p>
    </div>
  );
}
