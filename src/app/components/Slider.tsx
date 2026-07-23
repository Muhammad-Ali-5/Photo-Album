"use client";
import React, { createContext, useState } from "react";
import Navbar from "./Navbar";
import Side_Nav from "./Side_Nav";

export const Themecontext = createContext({ dark_theme: true });

export default function Slider({ children }: { children: React.ReactNode }) {
  const [dark_theme] = useState(true);

  return (
    <Themecontext.Provider value={{ dark_theme }}>
      <div className="min-h-screen bg-[#080610] text-gray-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row">
          <Side_Nav />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </Themecontext.Provider>
  );
}
