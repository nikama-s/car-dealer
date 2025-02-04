import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import TanstackProvider from "./components/tanstack";

export const metadata: Metadata = {
  title: "Car Dealer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative h-screen w-full">
          <Image
            src="/cars.jpg"
            alt="Car Dealers App"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-80"
          />
          <TanstackProvider>{children}</TanstackProvider>
        </div>
      </body>
    </html>
  );
}
