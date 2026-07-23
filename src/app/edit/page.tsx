"use client";

import { Suspense } from "react";
import EditImage from "../components/EditImage";
import Navbar from "../components/Navbar";
import Side_Nav from "../components/Side_Nav";
import { PulseLoader } from "react-spinners";

export default function EditPage() {
  return (
    <div className="min-h-screen bg-[#080610] text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl">
          <Suspense
            fallback={
              <div className="py-20 text-center">
                <PulseLoader color="#8b5cf6" size={10} />
              </div>
            }
          >
            <EditImage />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
