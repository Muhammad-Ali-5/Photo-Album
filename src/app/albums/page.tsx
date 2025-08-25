"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PulseLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { get_folders } from "../components/Get_data";
import Link from "next/link";
import { Themecontext } from "../components/Slider";

export default function Page() {
  const [folders, setfolders] = useState([]);
  const [loading, setloading] = useState(false);
  const theme = useContext(Themecontext);

  useEffect(() => {
    async function get_fold_name() {
      try {
        setloading(true);
        const res: any = await get_folders();
        setfolders(res.folders);
      } finally {
        setloading(false);
      }
    }
    get_fold_name();
  }, []);

  return (
    <div
      className={`my-5 ${
        theme.dark_theme ? "text-white" : "text-black"
      }  mx-6 relative h-full`}
    >
      <div
        className={`${theme.dark_theme ? "" : "text-black"} text-4xl font-bold`}
      >
        Albums Page
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-gray-00">
        {!loading &&
          folders.length !== 0 &&
          folders.map((val: any) => {
            return (
              <Card
                key={val.external_id}
                className={`${
                  theme.dark_theme ? "" : "text-black"
                } bg-cyan-00  border-gray-600 hover:border-gray-200`}
              >
                <CardHeader>
                  <CardTitle className="text-base sm:text-2xl">
                    {val.name}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-base ">
                    All your {val.name} images.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex justify-between">
                  <Link className="w-full" href={`albums/${val.name}`}>
                    <Button
                      className={`${
                        theme.dark_theme
                          ? "bg-gray-900 hover:bg-gray-700 text-white"
                          : "border-2 hover:bg-gray-200"
                      } border-black w-full sm:text-base sm:w-full text-xs`}
                    >
                      View Album
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}

        {!loading && folders.length === 0 && (
          <div className="bg-transparent translate-x-[-50%] translate-y-[-50%] absolute top-[40%] left-[50%] w-full text-center sm:text-4xl text-3xl font-bold">
            No Albums Created!
          </div>
        )}
      </div>

      {loading && (
        <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
          {loading && (
            <PulseLoader
              color={`${theme.dark_theme ? "#fff" : "#000"}`}
              margin={5}
              size={20}
              speedMultiplier={1.5}
            />
          )}
        </div>
      )}
    </div>
  );
}
